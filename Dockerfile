# https://registry.hub.docker.com/u/google/nodejs-runtime/
FROM google/nodejs-runtime

# Install Bower
RUN npm install -g bower
