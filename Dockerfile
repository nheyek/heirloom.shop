# ---------- Base image for building ----------
FROM node:24-alpine AS builder

ARG GOOGLE_MAPS_API_KEY
ENV GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY

WORKDIR /app

# Copy package manifests for all workspaces (including common)
COPY package*.json ./
COPY common/package*.json ./common/
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

# Build server — tsc --build compiles common first, then server
WORKDIR /app/server
RUN npm run build

# ---------- Runtime image ----------
FROM node:24-alpine AS runtime

WORKDIR /app

# Package manifests for root + all workspaces needed at runtime
COPY package*.json ./
COPY common/package.json ./common/package.json
COPY server/package*.json ./server/

# Stub the client workspace so npm workspaces doesn't error on the missing directory
RUN mkdir -p client && echo '{"name":"heirloom.shop-client","version":"1.0.0"}' > client/package.json

# Install production deps — creates node_modules/@heirloom/common symlink → ./common/
RUN npm install --omit=dev

# Compiled common output — the symlink resolves here at runtime
COPY --from=builder /app/common/dist ./common/dist

# Compiled server output (includes orm-metadata.json)
COPY --from=builder /app/server/dist ./dist

# .env files — dotenv-flow uses path.join(__dirname, '..') = /app/ in compiled output
COPY --from=builder /app/server/.env ./
COPY --from=builder /app/server/.env.production ./

# Client static files — server serves from path.join(__dirname, 'public') = /app/dist/public/
COPY --from=builder /app/client/dist ./dist/public

EXPOSE 3000
CMD ["node", "dist/app.js"]
