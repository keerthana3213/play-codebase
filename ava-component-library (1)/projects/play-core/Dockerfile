# Stage 1: Build the Angular library
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root and library package files
COPY package.json package-lock.json ./
COPY projects/play-core/package.json ./projects/play-core/

# Install dependencies
RUN npm install

# Copy Angular config and library source
COPY angular.json ./
COPY tsconfig.json ./
COPY projects/play-core ./projects/play-core

# Build the library
# RUN npm run build --workspace=projects/play-core
RUN npm run build --prefix projects/play-core

# Stage 2: Output only the built library (optional)
FROM node:20-alpine AS final
WORKDIR /app
COPY --from=builder /app/dist/play-core ./dist

CMD ["ls", "-l", "./dist"]
