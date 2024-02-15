import { CronJob } from 'cron'
import { tickerSearchTask } from './tasks/ticker-search-task'

export const tickerSearchCron = CronJob.from({
  // todo: it runs every 15 seconds for testing, change to once an hour or day in production
  cronTime: '*/15 * * * * *',
  onTick: tickerSearchTask,
  // prevent the job from firing automatically on creation
  // (we want to start it manually after the database is up in the server.ts file)
  start: false
})
