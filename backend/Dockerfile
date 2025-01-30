# backend/Dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install mqtt --save

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]
