# Этап 1: сборка фронтенда
FROM node:18 AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Этап 2: продакшен-сервер на nginx
FROM nginx:alpine

# Копируем собранный фронтенд
COPY --from=builder /app/dist /usr/share/nginx/html

# Удалим дефолтный конфиг nginx (переопределим позже)
RUN rm /etc/nginx/conf.d/default.conf

# Копируем свой конфиг nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
