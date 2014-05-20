FROM google/runtime-nodejs
#FROM hootener/node_express_bower

# Install grunt
RUN npm install -g grunt-cli

# Install Bower
RUN npm install -g bower

WORKDIR /app
ENV HOME /app
ADD package.json /app/
RUN npm install
ADD . /app/

EXPOSE 80
CMD ["node", "/app/bowerzipper.js"]

