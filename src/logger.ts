import pino from 'pino'
import pinoHttp from 'pino-http'
import config, { Environment } from './config/config'

const { appName, logLevel, env } = config

let isAppName = false
if (appName !== '') isAppName = true

export const logger = pino({
  name: isAppName ? appName : 'trading-data-service',
  level: logLevel,
  prettyPrint: env === Environment.Development ? { colorize: true } : false
})

export default pinoHttp({
  logger: logger
})
