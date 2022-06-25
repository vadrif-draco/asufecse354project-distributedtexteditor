# Dockerfile to use a Node image
# Used for backend services

# Create Node image
FROM node:alpine

# Add backend to specified path
WORKDIR /usr/backend

# Copy contents of backend folder to workdir
COPY ./backend ./

# Install dependencies
RUN npm install

# Expose port 3000 used by the backend. The script does it just in case too.
EXPOSE 3000

# Start server
CMD [ "npm", "run", "start:server" ]