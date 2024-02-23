import { CronJob } from 'cron'
import { tickerSearchTask } from './tasks/ticker-search-task'
import { getTradesTask } from './tasks/trade-history-task'

export const tickerSearchCron = CronJob.from({
  // runs every day
  cronTime: '0 0 * * *',
  onTick: tickerSearchTask,
  // prevent the job from firing automatically on creation
  // (we want to start it manually after the database is up in the server.ts file)
  start: false
})

export const tradeSearchCron = CronJob.from({
  // runs every 1 minutes
  cronTime: '* * * * *',
  onTick: getTradesTask,
  start: false
})
