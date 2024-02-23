import { createConnection } from 'typeorm'
import config from './config/config'
import dbConfig from './config/database'
import app from './app'
import './crontab'
import './scheduledJob'
import { tickerSearchTask } from './tasks/ticker-search-task'

const { appName, port } = config

createConnection(dbConfig)
  .then(async () => {
    app.listen(port, () =>
      console.log(`${appName} Server Now Listening on ${port}. Stay Sovryn.`)
    )

    tickerSearchTask().catch((er) =>
      console.error('tickerSearchTask init failed:', er)
    )
  })
  .catch((err) => {
    console.log('Unable to connect to db', err)
    process.exit(1)
  })
