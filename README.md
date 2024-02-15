# trading-data-service
Provides public endpoints with trading data history.

## Prerequisites

- Node.js
- Docker
- Docker Compose

## Running the application

To run the application, you need to have Docker and Docker Compose installed. Then you can run the following command:

`docker-compose up`

This will start the application and the database in docker containers.

Application will be available at `http://localhost:3000`.

You may need to create a `.env` file in the root of the project with the following content:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=trading-data
POSTGRES_HOST=sov-postgres
POSTGRES_PORT=5432
```

## Database Migrations

To make any changes to a database when running application in docker container, you first need to ssh into the container with the following command:

`docker exec -it trading-data-service sh`

Then you can generate new migration from the changes to the entity models by running:

`npm run migrations:generate -- -n <migration name>`

After generating a migration, you can run it on the database by running:

`npm run migrations:run`

Revert the last migration by running:

`npm run migrations:revert`
