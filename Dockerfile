FROM google/runtime-nodejs
FROM hootener/node_express_bower
 
WORKDIR /app
ENV HOME /app
ADD package.json /app/
RUN npm install
ADD . /app/
 
EXPOSE 3003
CMD ["node", "/app/bowarchiver.js"]

