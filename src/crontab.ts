import { CronJob } from 'cron'

export const tickerSearchJob = CronJob.from({
  // every minute
  cronTime: '0 * * * * *',
  onTick: () => { console.log('tickerSearchJob') },
  start: false
})

// todo: start job after app is ready and initial data is put into db
tickerSearchJob.start()
