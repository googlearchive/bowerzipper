bowerzipper
=============

Node app that generates a .zip for a particular bower install

## Run locally using Node

    git clone https://github.com/PolymerLabs/bowerzipper
    cd bowerzipper
    npm install
    node server.js

### Try it!

Hit http://localhost:8080/archive?core-ajax=Polymer/core-ajax

## Run locally using Docker

These instructions are only necessary if you want to run the local app using Docker.

### Installation

1. Install [Docker](http://docs.docker.com/installation/mac/)

2. Download [boot2docker](https://github.com/boot2docker/osx-installer/releases)

### Start the Docker VM

ssh into the docker VM and allow listening on 8080:

    boot2docker ssh -L 8080:localhost:8080

### Get the app code and build the image

    git clone https://github.com/PolymerLabs/bowerzipper
    sudo docker build -t bowerzipper bowerzipper/
    sudo docker run -p 8080:8080 bowerzipper

### Try it!

Hit http://localhost:8080/archive?core-ajax=Polymer/core-ajax