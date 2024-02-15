import { tickerSearchCron } from '../crontab'
import { TaskType } from '../entity/Task'
import { getLastTaskRun, setLastTaskRun } from '../models/task.model'

export async function tickerSearchTask (): Promise<void> {
  const now = new Date()
  // stop the cronjob from firing again while we are still processing the previous run
  tickerSearchCron.stop()

  // get the last time the task was run, if null, it has never been run
  const lastRun = await getLastTaskRun(TaskType.TICKER_SEARCH)

  console.log('tickerSearchTask started: ', lastRun)
  // TODO: implement the ticker search task

  // if successful, update the last run time (at the beginning of the function)
  await setLastTaskRun(TaskType.TICKER_SEARCH, now)
  // start the cronjob again
  tickerSearchCron.start()
}
