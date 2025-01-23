FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

ENV PORT=5050
EXPOSE $PORT

CMD ["npm", "run", "dev"]  