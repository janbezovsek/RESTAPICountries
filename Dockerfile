# Use Node.js 20 as the base image for building
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight image to serve the app
FROM node:20-slim

# Install serve globally
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=build /app/dist /app/dist

# Set working directory
WORKDIR /app

# Expose port 3000
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "dist", "-l", "3000"]