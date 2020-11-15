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

## About development process

When doing this kind of task I like writing a few words about
development process and the task itself.

At first I need to mention that creating this application took
pretty big amount of time (during one weekend I created applications
for recruitment tasks using completly different technological stacks-
this application is written in TypeScript and the other one in
Ruby, which hadn't been used by me for about 1.5 year) and in the
moment I am writing this line its not finished, but already contains
around 1400 lines of code* (yes, I understand it's not a good measure).

\* i used this (I am one of the weird guys using Windows and Powershell,
and claiming than its way better than Bash):

```powershell
PS C:\Users\kkm\Workspace\startwars-api> dir .\src\ -Filter "*.ts" -Recurse | Get-Content | Measure-Object -line

Lines Words Characters Property
----- ----- ---------- --------
 1110


PS C:\Users\kkm\Workspace\startwars-api> dir .\test\ -Filter "*.ts" -Recurse | Get-Content | Measure-Object -line

Lines Words Characters Property
----- ----- ---------- --------
  274
```

When reading code history you may see that I changed `express-graphql`
to `apollo-server` when working on this task. The reason for this
modification is that I have totally no experience with express implementation
of GraphQL- even if under the hood both libraries are using
the same or very similiar libraries. `express-graphql` library appeared
in this repository only because I used one of my old private repositories
as a template and copied this part of code. During my work with previous
GraphQL projects I used `apollo-graphql` and even developed my own
plugin using their api: [simple-apollo-logger](https://github.com/est-normalis/simple-apollo-logger),
which is used in this project.

### Thinks that are bad and should have been done better way

Due to limited amount of time and the fact that during development
process I focused more on application usability than on its quality
there are a lot of things I know I have done wrong way, or just
could be improved.

#### Error handling

Error handling in this application is pretty (if not very) bad.
When I started learning GraphQL I saw that returning
errors in data was a popular aproach (at least in tutorials),
and I fe. used it in
[this repository, which is over 2 years old](https://github.com/kuskoman/GiraffeCMS-backend/blob/master/app/graphql/mutations/create_user.rb)
(it's written in Ruby on Rails).
In this application I am just throwing `ApolloError`s, which
are preventing other operations to respond if more than other
query/mutation is executed at the same time. Also, the error messages,
even if pretty informative in development, would be looking
pretty bad on production.

#### Missing tests

It's one of the issues I can say would be totally fixed
if I had more time and/or energy to fix it. In the moment
of writing this line there are only a few tests for one
service and for auth. At this moment there is not a single
e2e test, or test mocking api calls (/using api). Also, there
is no logic responsible for executing tests on different database
than development. I only implemented util using very simple
way to acquire server instance to be used in e2e tests.

#### Missing "central" config module

At this moment config is just stored in environment variable
and there is no way to get all of them required to use application.
I notice this problem, however I decided not to make anything
about it, because there is not that much of them, as well
as some of them are used in `ormconfig.js` which makes had to
fetch them from TypeScript file (but mostly, because it requires time).

#### Not parsing dates

I did not do that, because I remember that in one application
parsing custom Date and DateTime scalars took me way more
time than it should, so I considered it a feature that may
take a lot of time (but I can implement it if needed).

#### Parsing (and caching)

I had two ideas how to cache these api calls-
by IDs and by URLs provided by api response.
Unfortunatelly, index action calls are not returning
url of resource (just only the next/prev page).
This could have been solved by parsing these URLs
(in case of "normal" url not provided), however
for some reason I did not do that and ended up
with this a bit weird code.

#### Commit history

Commit history in this repository may look a bit like a spaghetti-
I prefer working on a single branch when I am writing something alone.
This allows me to "jump" from feature to feature when I want to,
without doing rebases/merges, etc.
In my defense I will say that I tried to keep the commit history clean
and not to write funny (?) messages in titles, just in commit descriptions
if really needed (this is actually more universal than just this project).

#### Documentation

In my current job I am usually working with [OpenAPI Specification](https://swagger.io/specification/),
and I consider it enough to work with our api. Since documentation
was mentioned in task I decided to make it a part of readme,
and use it not only to describe how to use endpoint (actually mutation/query),
but also to describe how application is working "under the hood".
