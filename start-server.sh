#!/bin/bash

# Set environment variable with current hostname
export API_HOST=$(curl http://169.254.169.254/latest/meta-data/public-hostname)

# Change nginx configuration file to match new hostname
/bin/bash ./deployment_scripts/frontend/nginx-change-host.sh

# Change hostname Angular environment variable in case server URL changed
sed -i "s/^[ \t]*hostname: '[a-zA-Z0-9\.-]*'$/  hostname: '$API_HOST'/" ./src/environments/environment.prod.ts

# Build and run server
ng build
docker-compose up -d -scale backendserver=5 --build

# Backup database everyday at 00:00
(crontab -l 2>/dev/null; echo "0 0 * * * /home/ec2-user/distributed-project/asufecse354project-distributedtexteditor/deployment_scripts/db/backup-database.sh") | crontab -
