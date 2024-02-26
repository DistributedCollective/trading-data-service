import { createConnection } from 'typeorm'
import config from './config/config'
import dbConfig from './config/database'
import app from './app'
import './crontab'
import { getTradesTask } from './tasks/trade-history-task'
import { tickerSearchTask } from './tasks/ticker-search-task'

const { appName, port } = config

createConnection(dbConfig)
  .then(async () => {
    app.listen(port, () =>
      console.log(`${appName} Server Now Listening on ${port}. Stay Sovryn.`)
    )

    Promise.allSettled([
      tickerSearchTask(),
      getTradesTask()
    ]).catch((err) => console.error('Error in tasks', err))
  })
  .catch((err) => {
    console.log('Unable to connect to db', err)
    process.exit(1)
  })
