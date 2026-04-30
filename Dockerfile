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

EXPOSE 3000

ENTRYPOINT []

CMD npm run db && npm start & npx wait-on http://127.0.0.1:3000 && npm run cy:run:dev && npm run allure:generate
