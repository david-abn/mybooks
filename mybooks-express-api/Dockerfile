FROM node:20 as builder

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install
COPY . . 

RUN npm run setup

# Production stage
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --emit=dev

COPY --from=builder /app/dist/ ./dist
COPY --from=builder /app/prisma ./prisma

# Manually define where prisma query engined is, as download is not working
ENV PRISMA_QUERY_ENGINE_LIBRARY=./node_modules/@prisma/engines/libquery_engine-debian-openssl-3.0.x.so.node

EXPOSE 4000
CMD [ "npm", "start"]