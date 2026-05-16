FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip curl git \
    && docker-php-ext-install pdo pdo_mysql zip

RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    && chmod +x /usr/local/bin/composer

RUN a2enmod rewrite

COPY apache.conf /etc/apache2/sites-available/000-default.conf