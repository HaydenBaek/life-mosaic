# Use official Node.js image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy the entire project
COPY . .

# Build Next.js application
RUN npm run build

# Expose port 3000 (Next.js default port)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
