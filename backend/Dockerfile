# Use official lightweight Node.js Alpine image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json to install dependencies first (optimizes Docker cache)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application code (including the public folder)
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
