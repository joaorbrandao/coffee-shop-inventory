# Starbucks Coffee Shop Inventory

## Table of Content
- [Documentation](./docs/docs.md)
- [Setup](#setup)
- [Running the app](#running-the-app)
  - [yarn](#yarn)
  - [docker](#docker)
- [Tests](#tests)
  - [Unit Tests](#unit-tests)
  - [E2E Tests](#e2e-tests)
  - [Test Coverage](#test-coverage)
- [Extras](#extras)
  - [Seed Database](#seed-database)

# Setup

Check the existing [.env](./.env) file on the root folder of the project and customize it as needed.

# Running the app
You can run the app directly locally through [yarn](#yarn) or using [docker](#docker).

> If you want to run the app with already some data in the database, check how to seed it [here](#seed-database)!

## Docker
```bash
# watch and detached mode
$ docker-compose up -d
```

## yarn

```bash
#Make sure you have a database up and running! If not, run the following command:
$ docker compose up mariadb -d
```

```bash
# setup node environment
$ nvm use
```

```bash
# install dependencies
$ yarn install
```

```bash
# watch mode
$ yarn start:dev
```

```bash
# production mode
$ yarn start:prod
```

# Tests
This app contains unit and e2e tests. In order to run them follow the steps below.

## Unit tests
```bash
# run unit tests
$ yarn test
```

## E2E tests

```bash
# start the database
$ docker compose up mariadb -d

# run e2e tests
$ yarn test:e2e
```


## Test coverage
```bash
# run test coverage
$ yarn test:cov
```

# Extras

## Seed database

```bash
DB_HOST=127.0.0.1 DB_USER=root DB_NAME=starbucks ./scripts/seed_database.sh database/seeds.sql
```