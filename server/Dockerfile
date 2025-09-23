# Use Node.js LTS as base
FROM node:20-alpine

# Set work dir
WORKDIR /usr/src/app

# Install deps first (better layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy app code
COPY . .

# Expose app port
EXPOSE 3000

# Run your app
CMD ["npm", "run", "serve"]