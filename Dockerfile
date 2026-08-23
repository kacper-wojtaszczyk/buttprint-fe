FROM node:26-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:26-alpine AS runtime
WORKDIR /app

COPY --from=build /app/build ./build

EXPOSE 3000
ENV HOST=0.0.0.0
ENV PORT=3000

USER node

CMD ["node", "build/index.js"]
