FROM node:22.17.0-alpine AS deps
WORKDIR /app

RUN npm install --global pnpm@11.0.4

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:22.17.0-alpine AS build
WORKDIR /app

RUN npm install --global pnpm@11.0.4

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM nginx:1.27-alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
