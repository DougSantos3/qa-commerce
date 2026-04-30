FROM cypress/included:13.13.3

RUN apt-get update && \
    apt-get install -y default-jre && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --chmod=444 package*.json ./

RUN npm install

COPY --chmod=444 . .

COPY --chmod=555 scripts/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chown -R node:node /app/node_modules /app/src && \
    chmod -R 755 /app/node_modules /app/src

USER node

EXPOSE 3000

ENTRYPOINT []

CMD ["docker-entrypoint.sh"]
