FROM node:20 as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

FROM node:20 as production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

ENV PORT=${PORT:-3000}
ENV NODE_ENV=${NODE_ENV:-development}
ENV DATABASE_URL=${DATABASE_URL}
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

EXPOSE 3000

CMD [ "npm", "start" ]
