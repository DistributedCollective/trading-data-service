import { getRepository } from 'typeorm'
import { queryTrades } from '../utils/subgraph'
import { getLastTaskRun, setLastTaskRun } from '../models/task.model'
import { TaskType } from '../entity/Task'
import { tradeSearchCron } from '../crontab'
import { Ticker, Trade } from '../entity'
import dayjs from 'dayjs'
import config from '../config/config'

export const getTradesTask = async (): Promise<void> => {
  const currentTimestamp = dayjs()
  tradeSearchCron.stop()

  const chainId = config.isTestnet ? 31 : 30

  let lastTimestamp = await getLastTaskRun(TaskType.TRADE_SEARCH).then(value => (value != null) ? dayjs(value) : null)

  try {
    // If it's the first execution, set lastTimestamp and return
    if (lastTimestamp === null) {
      lastTimestamp = currentTimestamp.subtract(24, 'hours')
      console.log('getTradesTask() executed for the first time.')
    }

    // Calculate the time difference
    const timeDifference = currentTimestamp.diff(lastTimestamp, 'ms')
    console.log(`getTradesTask() executed. Time since last execution: ${timeDifference} ms`)

    const trades = await queryTrades(lastTimestamp, currentTimestamp)

    // Save trades to tradeRepository table
    const tradeRepository = getRepository(Trade)
    const tickerRepository = getRepository(Ticker)

    for (const trade of trades) {
      // Fetch Ticker entities based on token addresses
      const { timestamp, _return, _amount, _fromToken, _toToken } = trade
      const rate = parseFloat((Number(_return) / Number(_amount)).toFixed(9))

      const baseTicker = await tickerRepository.findOne({ address: _toToken.id, chainId })
      const quoteTicker = await tickerRepository.findOne({ address: _fromToken.id, chainId })

      if ((baseTicker == null) || (quoteTicker == null)) {
        console.error('Ticker not found for trade:', trade)
        continue
      }

      await tradeRepository.save({
        date: dayjs.unix(timestamp).toDate(),
        baseAmount: _return,
        quoteAmount: _amount,
        rate: rate,
        baseTicker: baseTicker,
        quoteTicker: quoteTicker
      })
    }

    await setLastTaskRun(TaskType.TRADE_SEARCH, currentTimestamp.toDate())
  } catch (error) {
    console.error('Error executing the job:', error)
  }

  tradeSearchCron.start()
}
