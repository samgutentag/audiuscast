# Stage 1: Build React App with Vite
FROM node:18 as build

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY resources ./resources
COPY *.js ./
COPY *.json ./
COPY .env ./

RUN npm run build


# Stage 2: Laravel build
FROM php:8.2-apache

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
  libonig-dev \
  libxml2-dev \
  zip \
  unzip \
  curl \
  && docker-php-ext-install pdo_mysql mbstring xml

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install node for audius.ts sdk script
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
  apt-get install -y nodejs

COPY ./package*.json ./
RUN npm install

COPY . /var/www/html
RUN composer install

COPY start.sh /usr/local/bin/start.sh

COPY --from=build /app/public/build /var/www/html/public/build

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
