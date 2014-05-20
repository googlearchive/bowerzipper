# https://index.docker.io/u/google/runtime-nodejs/
FROM google/runtime-nodejs

EXPOSE 80
CMD ["node", "/app/bowerzipper.js"]
