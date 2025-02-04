FROM node:15.2.0-alpine3.12 AS build

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
WORKDIR /app
RUN [ "yarn", "install" ]
COPY . /app
RUN [ "yarn", "build" ]

FROM node:15.2.0-alpine3.12 AS final
WORKDIR /app
ENV NODE_ENV production

COPY --from=build /app/package.json /app
COPY --from=build /app/yarn.lock /app
COPY --from=build /app/ormconfig.js /app
COPY --from=build /app/docker-entrypoint.sh /app
COPY --from=build /app/dist/ /app/dist
COPY --from=build /app/graphql/ /app/graphql
COPY --from=build /app/node_modules /app/node_modules

USER node

EXPOSE 4000
ENTRYPOINT [ "sh", "docker-entrypoint.sh" ]