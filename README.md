# trading-data-service
Provides public endpoints with trading data history.

## Database Migrations

1. Generate migration
   To make any changes to a database that is already deployed: `export POSTGRES_HOST=<postgres host> && export POSTGRES_PASSWORD=<password> export POSTGRES_DB=<db name> && npm run migrations:generate -- -n <migration name>`

2. Run migration
   After generating a migration, you can run it on a deployed database by running: `npm run migrations:run`