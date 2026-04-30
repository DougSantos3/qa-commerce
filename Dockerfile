FROM cypress/included:13.13.3

RUN apt-get update && \
    apt-get install -y default-jre && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN chown node:node /app

USER node

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

COPY --chown=node:node scripts/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT []

CMD ["docker-entrypoint.sh"]
