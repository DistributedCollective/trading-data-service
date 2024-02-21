import { createConnection } from 'typeorm'
import config from './config/config'
import dbConfig from './config/database'
import app from './app'
import './crontab'
import { tickerSearchTask } from './tasks/ticker-search-task'

const { appName, port } = config
createConnection(dbConfig)
  .then(() => {
    app.listen(port, () =>
      console.log(`${appName} Server Now Listening on ${port}. Stay Sovryn.`)
    )

    // start tasks for the first run once the database is up.
    tickerSearchTask().catch((er) =>
      console.error('tickerSearchTask init failed:', er)
    )
  })
  .catch((err) => {
    console.log('Unable to connect to db', err)
    process.exit(1)
  })
