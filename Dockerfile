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

# Expose port 8000 to allow outside connections to Laravel
EXPOSE 8000

# Start Laravel server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
