#!/bin/bash

# gcloud compute instances create bowerzipper-vm \
#     --image projects/google-containers/global/images/container-vm-v20140522 \
#     --metadata-from-file google-container-manifest=containers.yaml \
#     --zone us-central1-a \
#     --machine-type n1-standard-4 \
#     --tags=http-server

gcloud compute instances create bowerzipper-vm \
    --image projects/google-containers/global/images/container-vm-v20140522 \
    --metadata-from-file startup-script=startup.sh \
    --zone us-central1-a \
    --machine-type n1-standard-1 \
    --tags=http-server