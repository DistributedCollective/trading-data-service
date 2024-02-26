import { getRepository } from 'typeorm'
import { queryTrades } from '../utils/subgraph'
import { setLastTaskRun } from '../models/task.model'
import { TaskType } from '../entity/Task'
import { tradeSearchCron } from '../crontab'
import { Trade } from '../entity'
import dayjs from 'dayjs'

let lastTimestamp: dayjs.Dayjs | null = null

export const getTradesTask = async (): Promise<void> => {
  const currentTimestamp = dayjs()
  tradeSearchCron.stop()

  try {
    // If it's the first execution, set lastTimestamp and return
    if (lastTimestamp === null) {
      lastTimestamp = currentTimestamp.subtract(24, 'hours')
      console.log('getTradesTask() executed for the first time.')
    } else {
      // Calculate the time difference
      const timeDifference = currentTimestamp.diff(lastTimestamp, 'ms')
      console.log(`getTradesTask() executed. Time since last execution: ${timeDifference} ms`)

      const trades = await queryTrades(lastTimestamp, currentTimestamp)
      // Save trades to tradeRepository table
      const tradeRepository = getRepository(Trade)

      for (const trade of trades) {
        try {
          const { timestamp, _return, _amount } = trade
          await tradeRepository.save({
            date: dayjs.unix(timestamp).toDate(),
            baseAmount: _return,
            quoteAmount: _amount,
            rate: parseFloat(_return) / parseFloat(_amount)
          })
        } catch (error) {
          console.error('Error saving trade:', error)
        }
      }

      // Update lastTimestamp for the next execution
      lastTimestamp = currentTimestamp
    }
  } catch (error) {
    console.error('Error executing the job:', error)
  }

  await setLastTaskRun(TaskType.TRADE_SEARCH, currentTimestamp.toDate())
  tradeSearchCron.start()
}
