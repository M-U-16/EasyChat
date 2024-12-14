FROM node:20.10-alpine3.19 AS build
RUN mkdir /tmp/chatapp
WORKDIR /tmp/chatapp
COPY . .
RUN npm install
RUN npm run build

FROM node:20.10-alpine3.19
RUN mkdir /home/chatapp
WORKDIR /home/chatapp
COPY --from=build /tmp/chatapp/build .
COPY package*.json /home/chatapp/
RUN ls
RUN npm install --omit dev
CMD [ "node", "index.js" ]