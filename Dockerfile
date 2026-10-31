FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY server ./server
COPY data ./data
COPY public ./public

RUN mkdir -p uploads && mkdir -p data

ENV PORT=5000
EXPOSE 5000

CMD ["npx", "tsx", "server/index.ts"]

