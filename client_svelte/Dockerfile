FROM node:20.10-alpine3.19 AS build
RUN mkdir /tmp/chatapp
WORKDIR /tmp/chatapp
COPY . .
RUN npm install
RUN npm run build

FROM node:20.10-alpine3.19
RUN mkdir /home/chatapp
WORKDIR /home/chatapp
COPY package*.json .
COPY --from=build /tmp/chatapp/build .
RUN npm install --omit dev
CMD [ "node", "index.js" ]