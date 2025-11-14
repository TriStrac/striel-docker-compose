# ---------- Stage 1: Build Angular App ----------
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./
RUN npm install -g @angular/cli && npm install

# Copy source code
COPY . .

# Build Angular app in production mode
RUN ng build --configuration production

# ---------- Stage 2: Serve Built App ----------
FROM node:20-alpine

WORKDIR /app

# Install serve (lightweight static server with SPA mode)
RUN npm install -g serve

# Copy build output from previous stage
COPY --from=build /app/dist/ /app/dist/

# Expose port
EXPOSE 8080

# Run serve in SPA mode (-s) on port 8080
CMD ["serve", "-s", "dist/Scarrow/browser", "-l", "8080"]

