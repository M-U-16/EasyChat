FROM node:20.10-alpine3.19
RUN mkdir /tmp/chatapp
RUN mkdir /home/chatapp
WORKDIR /tmp/chatapp
RUN npm install
RUN npm run build
RUN cp build/* /home/chatapp/
RUN rm -r /tmp/chatapp
WORKDIR /home/chatapp
RUN npm install --omit dev
CMD [ "node" ]