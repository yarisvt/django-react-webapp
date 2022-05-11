FROM node:16.14.2-alpine

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY package*.json /app/

RUN npm install npm serve -g --silent
RUN npm ci --omit=dev --silent

COPY . /app/

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]