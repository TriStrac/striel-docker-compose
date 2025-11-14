# Stage 1: Build the Angular application
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with a Node.js & Express server
FROM node:20-alpine AS production
WORKDIR /app

# Copy only necessary files for production
COPY package*.json ./
COPY package-lock.json ./

# Install only production dependencies (this will include Express, but not Angular CLI, etc.)
RUN npm install --omit=dev

# Copy the built application from the 'build' stage
COPY --from=build /app/dist ./dist

# Copy the Express server script
COPY server.js .

# Expose the port that the Express server will run on
EXPOSE 4300

# The command to start the server
CMD ["node", "server.js"]
