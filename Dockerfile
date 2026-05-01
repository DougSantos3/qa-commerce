FROM cypress/included:13.13.3

RUN apt-get update && \
    apt-get install -y default-jre && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --chmod=444 package*.json ./

RUN npm install

COPY --chmod=555 src ./src
COPY --chmod=555 public ./public
COPY --chmod=555 config ./config
COPY --chmod=555 middleware ./middleware
COPY --chmod=555 scripts ./scripts
COPY --chmod=555 cypress ./cypress
COPY --chmod=444 cypress.config.js ./
COPY --chmod=444 eslint.config.js ./

COPY --chmod=555 scripts/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN mkdir -p /app/allure-results /app/allure-report /app/cypress/screenshots /app/cypress/videos /app/cypress/downloads && \
    chown -R node:node /app/node_modules /app/src /app/allure-results /app/allure-report /app/cypress/screenshots /app/cypress/videos /app/cypress/downloads && \
    chmod -R 755 /app/node_modules /app/src /app/allure-results /app/allure-report /app/cypress/screenshots /app/cypress/videos /app/cypress/downloads

USER node

EXPOSE 3000

ENTRYPOINT []

CMD ["docker-entrypoint.sh"]
