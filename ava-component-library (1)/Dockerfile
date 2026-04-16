# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build --prefix projects/play-core
RUN npx ng build playground

# Serve stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist/playground ./dist/playground
RUN npm install -g http-server
EXPOSE 4200
CMD ["http-server", ".", "-p", "4200", "--cors"]
