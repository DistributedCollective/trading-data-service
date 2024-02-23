import { CronJob } from 'cron';
import { queryTrades } from './utils/subgraph';
import { getRepository } from 'typeorm';
import { TradeHistory } from './entity/TradeHistory';

let lastTimestamp: number | null = null;

const getTradesCron = async () => {
  try {
    const currentTimestamp = Date.now();

    // If it's the first execution, set lastTimestamp and return
    if (lastTimestamp === null) {
      lastTimestamp = currentTimestamp;
      console.log('getTradesCron() executed for the first time.');
      return;
    }

    // Calculate the time difference
    const timeDifference = currentTimestamp - lastTimestamp;
    console.log(`getTradesCron() executed. Time since last execution: ${timeDifference} ms`);

    const trades = await queryTrades(lastTimestamp, currentTimestamp);

    // Save trades to TradeHistory table
    const tradeHistoryRepository = getRepository(TradeHistory);

    for (const trade of trades) {
      await tradeHistoryRepository.save({
        timestamp: trade.timestamp,
        baseToken: trade.collateralToken.id,
        quoteToken: trade.loanToken.id,
        price: trade.entryPrice,
        amount: trade.positionSize,
      });
    }

    // Update lastTimestamp for the next execution
    lastTimestamp = currentTimestamp;
  } catch (error) {
    console.error('Error executing the job:', error);
  }
};

// Create a CronJob to execute the getTradesCron func every minute
const job = new CronJob('* * * * *', getTradesCron);

job.start();
