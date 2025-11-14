 # ---- Stage 1: Build Stage ----
# Use a Node.js image that includes the full toolchain.
FROM node:20 AS builder

# Set the working directory inside the container.
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker layer caching.
COPY package*.json ./

# Install all dependencies, including the devDependencies needed for building.
RUN npm install

# Copy the rest of the application's source code.
COPY . .

# Build the TypeScript project into JavaScript.
RUN npm run build


# ---- Stage 2: Production Stage ----
# Use a lightweight Node.js Alpine image for a smaller final image size.
FROM node:20-alpine AS production

# Set the working directory.
WORKDIR /app

# Copy the package files from the builder stage.
COPY package*.json ./

# Install ONLY production dependencies.
RUN npm install --omit=dev

# Copy the compiled 'dist' folder from the builder stage.
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/scarrow-firebase-key.json ./scarrow-firebase-key.json
# Expose the port your Express app will run on.
# Replace 3000 if your app uses a different port.
EXPOSE 3000

# The command to start the application.
# This runs 'node dist/app.js' as defined in your package.json.
CMD [ "npm", "start" ]
