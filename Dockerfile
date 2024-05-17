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

COPY ./package*.json /var/www/html
RUN npm install

COPY . /var/www/html

RUN composer install --verbose

WORKDIR /var/www/html
RUN npm run build

COPY start.sh /usr/local/bin/start.sh

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]