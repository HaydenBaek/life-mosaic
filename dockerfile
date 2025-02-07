# Use a lightweight Node.js 20 base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application files
COPY . .

# Build the Next.js app
RUN npm run build

# Set environment variable for Next.js
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
