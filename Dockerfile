# ---------- Base image for building ----------
FROM node:24-alpine AS builder

ARG GOOGLE_MAPS_API_KEY
ENV GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY

WORKDIR /app

# Copy package manifests for all workspaces
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Single install from root resolves all workspaces
RUN npm install

# Copy source
COPY common ./common
COPY tsconfig.json ./
COPY server ./server
COPY client ./client

# Build client
WORKDIR /app/client
RUN npm run build

# Build server (transpile TS → JS)
WORKDIR /app/server
RUN npm run build

# ---------- Runtime image ----------
FROM node:24-alpine AS runtime

WORKDIR /app

# Copy root and server manifests
COPY package*.json ./
COPY server/package*.json ./server/

# Stub the client workspace so npm workspaces doesn't error on the missing directory
RUN mkdir -p client && echo '{"name":"heirloom.shop-client","version":"1.0.0"}' > client/package.json

# Install production deps only — root deps (zod, @ts-rest/core) are hoisted automatically
RUN npm install --omit=dev

# Copy server build output
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/.env ./dist/server/
COPY --from=builder /app/server/.env.production ./dist/server/

# Copy client build output into server's public folder
COPY --from=builder /app/client/dist ./dist/server/src/public

EXPOSE 3000
CMD ["node", "dist/server/src/app.js"]
