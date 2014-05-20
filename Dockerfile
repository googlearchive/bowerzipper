FROM google/runtime-nodejs

EXPOSE 80
CMD ["node", "/app/bowerzipper.js"]
