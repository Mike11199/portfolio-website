export const dockerExample = {
    language: "Docker", file: "Dockerfile", command: "docker build -f frontend/Dockerfile -t portfolio frontend",
    code: `# Build the React site and serve it with nginx.

# Build React with Node and the locked dependencies.
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Ship only static files and nginx, not the build tools.
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`,
    output: "[build] RUN npm run build\n[stage-1] COPY --from=build /app/dist /usr/share/nginx/html\nExported image: portfolio:latest",
  };
