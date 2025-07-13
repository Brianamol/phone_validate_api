# Use slim version of Node for smaller image
FROM node:18-slim

# Set working directory inside container
WORKDIR /usr/src/app

# Copy only package files first to install deps
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the rest of the app
COPY . .

# Expose port (same as in .env)
EXPOSE 3001

# Run the app
CMD ["node", "index.js"]
