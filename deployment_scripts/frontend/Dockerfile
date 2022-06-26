# Dockerfile to use an nginx image
# Used for frontend serving

# nginx image
FROM nginx:alpine
# Copy nginx config to image
COPY ./deployment_scripts/frontend/nginx.conf /etc/nginx/nginx.conf
COPY ./deployment_scripts/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./deployment_scripts/frontend/mime.types /etc/nginx/mime.types
# Set working directory to nginx HTML directory
WORKDIR /usr/share/nginx/html

ENV HOSTNAME="http://ec2-54-196-216-236.compute-1.amazonaws.com"
# Remove default nginx assets
RUN rm -rf ./*
# Copy Angular build from builder stage
COPY ./dist/asufecse354project-distributedtexteditor ./

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
