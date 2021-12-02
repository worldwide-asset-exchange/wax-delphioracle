ARG NODE_VERSION=16.13.0

FROM node:${NODE_VERSION}-alpine as app
# Create app directory
WORKDIR /app

# Setup required app
RUN npm i -g pm2@5.1.2

RUN pm2 install typescript
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:max_size 2M
RUN pm2 set pm2-logrotate:retain 2

# Install dependencies
COPY package*.json ./

RUN npm i

COPY src src/
COPY plugins plugins/
COPY .env.example ecosystem.config.js tsconfig.json index.ts ./

VOLUME [ "/app" ]

ENV NODEOS_ENDPOINT="https://wax.eosn.com"
ENV PRIVATE_KEYS="<PRIVATE KEY>"
ENV ACCOUNT="<ACCOUNT>"
ENV PERMISSION="<PERMISSION>"

# Run the app
CMD ["sh", "-c", "pm2-runtime ecosystem.config.js"]
