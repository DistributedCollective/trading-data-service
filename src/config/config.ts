import convict from 'convict'

export enum Environment {
  Production = 'production',
  Development = 'development',
  Test = 'test',
}

const config = convict({
  env: {
    doc: 'The application environment.',
    format: [...Object.values(Environment)],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  appName: {
    doc: 'application name',
    format: String,
    default: 'trading-data-service',
    env: 'APP_NAME'
  },
  logLevel: {
    doc: 'application log level',
    format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
    default: 'info',
    env: 'LOG_LEVEL'
  },
  postgresHost: {
    doc: 'postgres host',
    format: String,
    default: 'sov-postgres',
    env: 'POSTGRES_HOST'
  },
  postgresPort: {
    doc: 'postgres port',
    format: 'port',
    default: 5432,
    env: 'POSTGRES_PORT'
  },
  postgresUser: {
    doc: 'postgres user',
    format: String,
    default: 'sov-postgres',
    env: 'POSTGRES_USER'
  },
  postgresPassword: {
    doc: 'postgres password',
    format: '*',
    default: '',
    env: 'POSTGRES_PASSWORD',
    sensitive: true
  },
  postgresDatabase: {
    doc: 'postgres database',
    format: String,
    default: 'trading-data',
    env: 'POSTGRES_DB'
  }
})

config.validate({ allowed: 'strict' })

export default config.getProperties()
