# ---------- Base image for building ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install global tools
RUN npm install -g typescript

# Include common types
COPY common ./common
COPY tsconfig.base.json ./

# Copy package manifests
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
WORKDIR /app/server
RUN npm install
WORKDIR /app/client
RUN npm install

# Copy the full source
WORKDIR /app
COPY server ./server
COPY client ./client

# Build client
WORKDIR /app/client
RUN npm run build

# Build server (transpile TS → JS)
WORKDIR /app/server
RUN npm run build

# ---------- Runtime image ----------
FROM node:20-alpine AS runtime

WORKDIR /app

# Only copy built artifacts and production deps
COPY server/package*.json .
RUN npm install --omit=dev

# Copy server build output
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/.env ./dist/server/.env
COPY --from=builder /app/server/.env.production ./dist/server/.env.production

# Copy client build output into server's public folder
COPY --from=builder /app/client/dist ./dist/server/src/public

# Expose the port App Platform will set
EXPOSE 3000

# Start the server (compiled JS entrypoint)
CMD ["node", "dist/server/src/app.js"]
