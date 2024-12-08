FROM node:20.18-slim
RUN mkdir /home/chatapp
WORKDIR /home/chatapp
COPY . .
RUN apk add --no-cache --virtual .gyp python3 py-setuptools make g++
RUN npm install --omit dev
CMD [ "node" ]