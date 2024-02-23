import { getRepository } from 'typeorm';
import { queryTrades } from '../utils/subgraph';
import { setLastTaskRun } from '../models/task.model';
import { TaskType } from '../entity/Task';
import { tradeSearchCron } from '../crontab';
import { Ticker, Trade } from '../entity';
import dayjs from 'dayjs';

let lastTimestamp: dayjs.Dayjs | null = null;

export const getTradesTask = async (): Promise<void> => {
  const currentTimestamp = dayjs();
  tradeSearchCron.stop();

  try {
    // If it's the first execution, set lastTimestamp and return
    if (lastTimestamp === null) {
      lastTimestamp = currentTimestamp.subtract(24, 'hours');
      console.log('getTradesTask() executed for the first time.');
    }

    // Calculate the time difference
    const timeDifference = currentTimestamp.diff(lastTimestamp, 'ms');
    console.log(`getTradesTask() executed. Time since last execution: ${timeDifference} ms`);

    const trades = await queryTrades(lastTimestamp, currentTimestamp);

    // Save trades to tradeRepository table
    const tradeRepository = getRepository(Trade);
    const tickerRepository = getRepository(Ticker);

    for (const trade of trades) {
      try {
        const { timestamp, _return, _amount, _toToken, _fromToken } = trade;

        // Fetch Ticker entities based on token addresses
        const baseTicker = await tickerRepository.findOne({ address: _toToken.id });
        const quoteTicker = await tickerRepository.findOne({ address: _fromToken.id });

        if (baseTicker && quoteTicker) {
          await tradeRepository.save({
            // baseTicker: baseTicker,
            // quoteTicker: quoteTicker,
            date: dayjs.unix(timestamp).toDate(),
            baseAmount: _return,
            quoteAmount: _amount,
            rate: parseFloat(_return) / parseFloat(_amount),
          });
        } else {
          console.error('Ticker not found for trade:', trade);
        }
      } catch (error) {
        console.error('Error saving trade:', error);
      }
    }

    // Update lastTimestamp for the next execution
    lastTimestamp = currentTimestamp;
  } catch (error) {
    console.error('Error executing the job:', error);
  }

  await setLastTaskRun(TaskType.TRADE_SEARCH, currentTimestamp.toDate());
  tradeSearchCron.start();
};
