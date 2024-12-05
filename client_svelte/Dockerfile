FROM node:20.10-alpine3.19
RUN mkdir /tmp/chatapp
RUN mkdir /home/chatapp
WORKDIR /tmp/chatapp
COPY . .

RUN npm install
RUN npm run build
RUN cp build -r /home/chatapp
RUN cp package*.json /home/chatapp
WORKDIR /home/chatapp
RUN rm -r /tmp/chatapp

RUN npm install --omit dev
CMD [ "node" ]