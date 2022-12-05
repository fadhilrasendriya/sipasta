FROM node:16-alpine
WORKDIR /app
COPY package-lock.json package.json ./
RUN npm install

COPY src src
copy migrations migrations

EXPOSE 8080
CMD ["npm", "run", "start"]
