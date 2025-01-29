# Step 1 build the production react app
FROM node:18-slim AS builder
WORKDIR /frontend
COPY ./frontend/package*.json .
RUN npm install --legacy-peer-deps
COPY ./frontend .
RUN npm run build

# Step 2 build the webserver
FROM nginx:alpine
COPY ./webserver/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /frontend/build /usr/share/nginx/html