FROM node:9
RUN mkdir /be-docker
ADD . /be-docker
WORKDIR /be-docker
RUN npm i
EXPOSE 80
CMD ["npm", "start"]
