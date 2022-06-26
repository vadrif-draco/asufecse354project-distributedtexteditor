#!/bin/bash

# Set environment variable with current hostname
export API_HOST=$(curl http://169.254.169.254/latest/meta-data/public-hostname)

/bin/bash ./deployment_scripts/frontend/nginx-change-host.sh

