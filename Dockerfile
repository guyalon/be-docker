FROM node:7
RUN mkdir /be-docker
ADD . /be-docker
WORKDIR /be-docker
RUN npm i
EXPOSE 80
CMD ["npm", "start"]
