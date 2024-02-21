import { CronJob } from 'cron'
import { tickerSearchTask } from './tasks/ticker-search-task'

export const tickerSearchCron = CronJob.from({
  // runs every day
  cronTime: '0 0 * * *',
  onTick: tickerSearchTask,
  // prevent the job from firing automatically on creation
  // (we want to start it manually after the database is up in the server.ts file)
  start: false
})
