# Stage 1: Build React App with Vite
FROM node:18 as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY resources ./resources
COPY *.js ./
COPY *.json ./
COPY .env ./

# Build the React app
RUN npm run build


# Use an official PHP with Apache image as the base image
FROM php:8.2-apache

# Set the working directory to /var/www/html
WORKDIR /var/www/html

# Install PHP extensions and other dependencies
RUN apt-get update && apt-get install -y \
  libonig-dev \
  libxml2-dev \
  zip \
  unzip \
  curl \
  && docker-php-ext-install pdo_mysql mbstring xml

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the local Laravel code to the container
COPY . /var/www/html

COPY start.sh /usr/local/bin/start.sh

COPY --from=build /app/public/build /var/www/html/public/build

# Expose port 8000 to allow outside connections to Laravel
EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
