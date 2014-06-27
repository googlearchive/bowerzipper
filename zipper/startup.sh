#! /bin/bash
# Startup script for to be run on the Google Cloud VM.

git clone https://github.com/PolymerLabs/bowerzipper

sudo docker build -t bowerzipper bowerzipper/
sudo docker run -p 80:8080 bowerzipper &
