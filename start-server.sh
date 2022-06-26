#!/bin/bash

# Set environment variable with current hostname
export API_HOST=$(curl http://169.254.169.254/latest/meta-data/public-hostname)

# Change nginx configuration file to match new hostname
/bin/bash ./deployment_scripts/frontend/nginx-change-host.sh

# Change hostname Angular environment variable in case server URL changed
sed -i "s/^[ \t]*hostname: '[a-zA-Z0-9\.-]*'$/  hostname: '$API_HOST'/" ./src/environments/environment.prod.ts
