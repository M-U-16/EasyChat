FROM node:20.10-alpine3.19
RUN mkdir /home/chatapp
WORKDIR /home/chatapp
COPY . .
RUN npm install --omit dev
RUN node src/create_db.js
CMD [ "node" ]