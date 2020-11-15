# SW app

## Installation

### Development

#### Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [Node](https://nodejs.org/en/download/current/)(v15.2.0 recommended)*
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)

*Works best with [Node Version Manager](https://github.com/nvm-sh/nvm)

#### Setup

1. Start services from `docker-compose.yml`

    ```shell
    docker-compose up -d
    ```

2. Install Dependencies

    ```shell
    yarn
    ```

3. Migrate database

   ```shell
   yarn migration:run
   ```

4. Start the application in development mode

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

#### Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)

#### Setup

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
