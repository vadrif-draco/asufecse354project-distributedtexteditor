#!/bin/bash

# Change directory to project main directory
cd ~/distributed-project/asufecse354project-distributedtexteditor

# Uncomment the following two lines to install dependencies if needed
# npm install
# npm install @angular/cli

# Build Angular app
ng build

# Build docker image
docker build -t frontend -f ./deployment_scripts/frontend/Dockerfile .
# Run docker container
docker run -d --name frontend -p 80:80 frontend:latest