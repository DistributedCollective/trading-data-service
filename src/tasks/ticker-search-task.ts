import { tickerSearchCron } from '../crontab'
import { TaskType } from '../entity/Task'
import { getLastTaskRun, setLastTaskRun } from '../models/task.model'
import { createTicker, getTickers } from '../models/ticker.model'
import { queryTokens } from '../utils/subgraph'
import config from '../config/config'

export async function tickerSearchTask (): Promise<void> {
  const now = new Date()
  // stop the cronjob from firing again while we are still processing the previous run
  tickerSearchCron.stop()

  // get the last time the task was run, if null, it has never been run
  const lastRun = await getLastTaskRun(TaskType.TICKER_SEARCH)

  console.log('tickerSearchTask started: ', lastRun)

  const [tokens, tickers] = await Promise.all([queryTokens(), getTickers()])

  const chainId = config.isTestnet ? 31 : 30
  const newTokens = tokens.filter(
    (token) =>
      token.symbol != null &&
      token.id != null &&
      tickers.find(
        (ticker) =>
          ticker.address.toLowerCase() === token.id.toLowerCase() &&
          ticker.chainId === chainId
      ) == null
  )

  newTokens.map(
    async (token) =>
      await createTicker({
        symbol: token.symbol,
        name: token.name,
        chainId,
        address: token.id,
        decimals: token.decimals,
        description: ''
      })
  )

  // if successful, update the last run time (at the beginning of the function)
  await setLastTaskRun(TaskType.TICKER_SEARCH, now)
  // start the cronjob again
  tickerSearchCron.start()
}
