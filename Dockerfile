FROM cypress/included:13.13.3

RUN apt-get update && \
    apt-get install -y default-jre && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --chmod=444 package*.json ./

RUN npm install

COPY --chmod=444 src ./src
COPY --chmod=444 public ./public
COPY --chmod=444 config ./config
COPY --chmod=444 middleware ./middleware
COPY --chmod=444 scripts ./scripts
COPY --chmod=444 cypress ./cypress
COPY --chmod=444 cypress.config.js ./
COPY --chmod=444 eslint.config.js ./

COPY --chmod=555 scripts/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chown -R node:node /app/node_modules /app/src && \
    chmod -R 755 /app/node_modules /app/src

USER node

EXPOSE 3000

ENTRYPOINT []

CMD ["docker-entrypoint.sh"]
