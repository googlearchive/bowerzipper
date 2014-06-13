bowerzipper
=============

Node app that generates a .zip for a particular bower install

## 1. Install the on Google Cloud Engine

1. Open the project page: [https://console.developers.google.com/project/apps~bowerarchiver/compute/instances](https://console.developers.google.com/project/apps~bowerarchiver/compute/instances) and click the SSH button.
2. Login to the VM using the SSH command you get (e.g. `gcutil ssh bowerzipper-vm`).

3. Install the code from github

      git clone https://github.com/PolymerLabs/bowerzipper

## 2. Updating the app on Google Cloud Engine

First, ssh into the vm and shutdown the running process

    ps -ef | grep bowerzipper
    # kill -9 the process id

Next, we need to update the image from the code here on Github.

    cd bowerzipper
    git pull origin master
    sudo docker build -t bowerzipper .
    sudo docker run -p 80:8080 bowerzipper

**Note** the 80 instead of 8080:8080 (used below).

### Try it!

The IP of the machine is `23.236.53.27`. You should be able to hit [http://23.236.53.27/archive?core-ajax=Polymer/core-ajax](http://23.236.53.27/archive?core-ajax=Polymer/core-ajax)

## Run locally using Node

    git clone https://github.com/PolymerLabs/bowerzipper
    cd bowerzipper
    npm install
    node server.js

### Try it!

Hit [http://localhost:8080/archive?core-ajax=Polymer/core-ajax](http://localhost:8080/archive?core-ajax=Polymer/core-ajax)

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

Hit [http://localhost:8080/archive?core-ajax=Polymer/core-ajax](http://localhost:8080/archive?core-ajax=Polymer/core-ajax)
