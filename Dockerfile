# Use official Node.js image to build the React app
FROM node:18-alpine AS builder

WORKDIR /app
COPY liteview-client/package.json liteview-client/package-lock.json ./
RUN npm install
COPY liteview-client ./
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
