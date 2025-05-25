# Use the official Node.js LTS image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy only package files first to install dependencies
COPY package*.json ./

# Install dependencies (including nodemon)
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (usually 3000)
EXPOSE 3003

# Start the app with nodemon
CMD ["npm", "run", "dev"]

