FROM node:16-alpine
WORKDIR /app
COPY package-lock.json package.json ./
COPY src src
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]
