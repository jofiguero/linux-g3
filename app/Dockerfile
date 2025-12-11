FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend


COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .

RUN npm run build 


FROM node:18-alpine AS backend-builder
WORKDIR /app/backend


COPY backend/package*.json ./
RUN npm install

COPY backend/ .

RUN npm run build


FROM node:18-alpine
WORKDIR /app

COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/package*.json ./
COPY --from=backend-builder /app/backend/node_modules ./node_modules


COPY --from=frontend-builder /app/frontend/dist ./public

EXPOSE 3000

ENV PORT=3000

CMD ["node", "dist/index.js"] 
