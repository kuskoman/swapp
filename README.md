# SW app

## Installation

### Development

#### Development requirements

- [Docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [Node](https://nodejs.org/en/download/current/) (v15.2.0 recommended)*
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)

*Works best with [Node Version Manager](https://github.com/nvm-sh/nvm)

#### "Development" setup

1. Start services from `docker-compose.yml`

    ```shell
    docker-compose up -d
    ```

2. Install Dependencies

    ```shell
    yarn
    ```

3. Build migrations (with application)

   ```shell
   yarn build
   ```

4. Migrate database

   ```shell
   yarn migration:run
   ```

5. Start the application in development mode

   ```shell
   yarn start
   ```

After these steps app and [GraphQL Playground](https://github.com/graphql/graphql-playground)
should be aviable under [localhost:4000](http://localhost:4000).
Port of the application can be changed by setting `SERVER_PORT` environment variable,
or by adding it to `.env` file in root directory.

Example:

```plaintext
SERVER_PORT=4001
```

### "Production"

#### "Production" requirements

- [Docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)

#### "Production" setup

Setup in "production" environment is limited to a single command:

```shell
docker-compose -f .\docker-compose.full.yml up
```

## Usage

The application exposes GraphQL API, which can be used with
clients such as:

- [Postman](https://www.postman.com/)
- [GraphQLPlayground](https://github.com/graphql/graphql-playground)
- [Insomnia](https://insomnia.rest/graphql/)
- [Altair](https://altair.sirmuel.design/)

and [GraphiQL](https://github.com/graphql/graphiql), which is not
recommended, since it was designed according to the idea that
GraphQL is 7th layer protocol and should be transport layer independent,
which in this case causes problems because its missing request headers
feature. If you really want to use this application you should look
for forks and/or extensions allowing to pass custom headers.

If you are using app in development mode you can use web version
of GraphQLPlayground exposed along with API.

### Commands

Application contains node scripts, which could be useful during application
development:

#### build

Builds the application to JavaScript files and maps using [ttypescript](https://github.com/cevek/ttypescript),
[typescript-transform-paths plugin](https://github.com/LeDDGroup/typescript-transform-paths)
and (of course) TypeScript compiler.

#### start

Starts application using [ts-node](https://www.npmjs.com/package/ts-node) and
sets `NODE_ENV` in application process to `development`.

#### test

Runs tests located under `test/` directory using [Jest](https://jestjs.io/) and
[ts-jest](https://github.com/kulshekhar/ts-jest).

This directory contains all types of tests and requires database to work.
After the command is executed test database is migrated, and after tests
are finished the database is being dropped.

Tests are executed on the same redis instance devlopment uses.

#### types:generate

Generates types and interfaces for query, mutation and type resolvers using
wonderful [GraphQL-codegen library](https://graphql-code-generator.com/).

Generated files are stored under `generated/graphql.d.ts`.

#### migration:create

Helper for creating migration files. Requires `<name>` positional argument to work.
Example:

```shell
yarn migration:create AddUsers
```

#### migration:run

Runs migration in current environment.

#### migration:run:test-db

Runs migration in test environment. This command should not be required.

### Endpoints

Since this application utilizes GraphQL API it constins only single endpoint,
however I will use this name to describe mutations and queries.

#### signup

`signup` mutation takes `email` and `password`, validates both and returns
`User` and `token`.

User type definition can be found in [graphql/user.graphql](./graphql/user.graphql).

Token is a string, which should be placed in `Authorization` http header
(see [Authorization](### Authorization) for more info).

Password validation is using other function than email validation
(password has to be hashed before object validation is done), therefore in case
of both of inputs invalid only first (password) error will be returned.

During signup process application makes request to [SWAPI](https://swapi.dev/)
before validating email.

#### login

`login` mutation is very similiar to [signup](#signup)- takes the same
arguments and returns the same payload, however instead of creating new
user checks if hash of entered password is matching hash (and salt) saved
in database, then created new session in Redis.

#### hero

`hero` query takes optional id argument and returns hero associated with user.
In case of receiving id differnt than expected returns error.

#### films

`films` query returns all films associated with user.

#### film

`film` query takes id as an argument and returns requested
film if users hero has its ownership. Otherwise returns forbidden error.

#### species

`species` query returns all species associated with user.

#### specie

`specie` query takes id as an argument and returns requested
specie if users hero has its ownership. Otherwise returns forbidden error.

Yes, I know that word *specie* does not exists. I just needed a name to distinguish
it from indexing endpoint, so I had to be creative.

### Authorization

This app uses authentication logic built nearly from scratch.
I decided to use this aproach because

1. Its fun
2. I consider it safe
3. I don't have any node library which I trust

Auth flow works like this:

1. User provides email and password.
Email is saved to database with password hashed using bcrypt
2. Server generates session identifier, key, and key hash (in this case using pretty weak md5).
3. Server saves key hash with session identifier and user id to Redis db.
4. User recives key and session identifier. The key is no longer stored in server.
5. User sends request with key and session identifier received in previous step.
6. Server finds session data using session identifier and compares hashes.
7. If both hashes are the same returns user id to application context.

This flow gives application maintainer additional time to enforce password change
and session reset in case of leaked databases. I am pretty sure there are
good field-tested implementations of this alghoritm in JS/TS, however as
I said, I currently don't have them in my "toolbox".
