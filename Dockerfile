FROM node:18-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:18-slim
WORKDIR /app

COPY --from=builder /app /app

ENV PORT=5050
EXPOSE $PORT

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s CMD curl -f http://localhost:$PORT || exit 1

CMD ["npm", "run", "dev"]  