bowerzipper
=============

Node app that generates a .zip for a particular bower install. The backend (zipper.bowerarchiver.appspot.com) runs on Google Compute Engine as managed VM. The frontend (bowerarchiver.appspot.com) runs on Google App Engine.

## Admin on Google Cloud Engine

The cloud console page is at [https://console.developers.google.com/project/apps~bowerarchiver/compute/instances](https://console.developers.google.com/project/apps~bowerarchiver/compute/instances). From here, you can ssh into machines, manage the VMs, and project settings.

## Updating the zipper on Google Cloud Engine

1. Install the code from github

        git clone https://github.com/PolymerLabs/bowerzipper

2. Make your changes.

3. Deploy the frontend and/or backend using:

        gcloud app deploy frontend/
        gcloud app deploy zipper/

### Try it!

The frontend allows you to download components: `bowerarchiver.appspot.com`. 

You should be able to hit the endpoint and download stuff. You can also pass params directly to interact with the web service:

- Single component takes the form `<name>=<org>/<name>`:

    [http://bowerarchiver.appspot.com/archive?core-ajax=Polymer/core-ajax](http://bowerarchiver.appspot.com/archive?core-ajax=Polymer/core-ajax)

- Multiple components are separated by `&`:

    [http://bowerarchiver.appspot.com/archive?core-ajax=Polymer/core-ajax&core-field=Polymer/core-field](http://bowerarchiver.appspot.com/archive?core-ajax=Polymer/core-ajax&core-field=Polymer/core-field)

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
    sudo docker run -d -p 8080:8080 bowerzipper

### Try it!

Hit [http://localhost:8080/archive?core-ajax=Polymer/core-ajax](http://localhost:8080/archive?core-ajax=Polymer/core-ajax)
