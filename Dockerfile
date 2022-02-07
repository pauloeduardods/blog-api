FROM node:erbium-alpine3.14

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install
RUN npm install -g sequelize-cli
COPY ./ ./
CMD ["npm", "start"]

EXPOSE ${PORT}