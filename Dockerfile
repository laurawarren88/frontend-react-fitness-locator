# Step 1 build the production react app
FROM node:18-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Step 2 build the webserver
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY /webserver/default.conf /opt/homebrew/etc/nginx/nginx.conf
