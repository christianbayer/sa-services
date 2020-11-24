FROM php:7.4-apache

# Update packages
RUN apt-get update

#####################################
# Curl
#####################################
# Install curl and requirements
RUN apt-get install -y --no-install-recommends libcurl4-openssl-dev \
    && docker-php-ext-install curl

#####################################
# GIT
#####################################
# Install git
RUN apt-get install -y --no-install-recommends git

#####################################
# Compression
#####################################
# Install zip, bz2 and requirements
RUN apt-get install -y --no-install-recommends zip unzip libzip-dev libbz2-dev zlib1g-dev \
    && docker-php-ext-install zip \
    bz2

#####################################
# MCrypt
#####################################
# Install mcrypt and requirements
RUN apt-get install -y --no-install-recommends libmcrypt-dev \
    && pecl install mcrypt-1.0.3 \
    && docker-php-ext-enable mcrypt

#####################################
# MySQL PDO
#####################################
# Install mysql pdo
RUN docker-php-ext-install pdo_mysql

#####################################
# GD
#####################################
# Install gd and requirements
RUN apt-get install -y --no-install-recommends libjpeg-dev libpng-dev libfreetype6-dev \
    && docker-php-ext-configure gd \
    --with-jpeg \
    --with-freetype \
    && docker-php-ext-install gd

#####################################
# Composer
#####################################
# Install the composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Clear package lists
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Enable Apache mods
RUN a2enmod rewrite
RUN a2enmod headers
RUN a2enmod ssl

# Configure Apache site
RUN printf "<VirtualHost *:80>\n         ServerName localhost\n         ServerAdmin webmaster@localhost\n         DocumentRoot /var/www/html/public\n\n         <Directory /var/www/html/public>\n             Options Indexes FollowSymLinks\n             AllowOverride All\n             Require all granted\n         </Directory>\n\n         ErrorLog /var/log/apache2/_error.log\n         CustomLog /var/log/apache2/_access.log combined\n\n</VirtualHost>\n" >> /etc/apache2/sites-available/000-default.conf

# Create application directory
WORKDIR /var/www/html
RUN chown -R www-data:www-data /var/www/html

# Expose the port for HTTP and HTTPS access
EXPOSE 80 443
