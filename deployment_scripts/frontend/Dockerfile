# Dockerfile to use both Node and nginx images
# Used for frontend serving

# Name the node stage "builder"
FROM node:alpine AS builder
# Set working directory
WORKDIR /frontend
# Copy all files from build directory to container workdir
COPY ./dist/asufecse354project-distributedtexteditor ./

# nginx image
FROM nginx:alpine
# Copy nginx config to image
COPY ./deployment_scripts/frontend/nginx.conf /etc/nginx/nginx.conf
COPY ./deployment_scripts/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./deployment_scripts/frontend/mime.types /etc/nginx/mime.types
# Set working directory to nginx HTML directory
WORKDIR /usr/share/nginx/html

# Remove default nginx assets
RUN rm -rf ./*
# Copy Angular build from builder stage
COPY --from=builder /frontend .

# Expose port 80 used by nginx. The script does it just in case too.
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]