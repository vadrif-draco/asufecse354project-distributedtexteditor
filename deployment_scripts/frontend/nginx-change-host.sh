#!/usr/bin/env sh
set -eu

envsubst '${API_HOST}' < ./deployment_scripts/frontend/nginx.conf.template > ./deployment_scripts/frontend/nginx.conf

exec "$@"
