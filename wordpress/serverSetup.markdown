# Add missing packages for Wordpress

`$ sudo apt-get install mysql-client mysql-server nginx php5-fpm php5-mysql`


# Basic Nginx configuration

`$ sudo cp /etc/nginx/sites-available/cruitedfrontend /etc/nginx/sites-available/rising-sun`
`$ sudo ln -s /etc/nginx/sites-available/rising-sun /etc/nginx/sites-enabled/rising-sun`

Modify the Nginx config file to enable PHP:
`$ sudo vi /etc/nginx/sites-available/rising-sun`

Modify those lines:

- `root /home/play/cruited-frontend/web;` -> `root /home/play/rising-sun/web;`
- `server_name frontend.cruited.8b.nu;` -> `server_name rising-sun.se;`

`$ sudo service nginx reload`


# Add hostname to /etc/hosts

`$ sudo vi /etc/hosts`
`188.40.99.15 rising-sun.se`


# Raise the upload limit

`$ sudo vi /etc/nginx/nginx.conf`

Add `client_max_body_size 8M;` at the bottom of the Basic Settings section.

`$ sudo service nginx reload`

`$ sudo vi /etc/php5/fpm/php.ini`

Update to `upload_max_filesize = 7M`

`$ sudo service php5-fpm restart`


# File permissions & security

    $ cd /home/play/rising-sun
    $ sudo chown -R www-data:www-data .
    $ find . -type d -exec chmod 755 {} \;
    $ find . -type f -exec chmod 644 {} \;

    $ cd web/app/themes
    $ sudo mkdir rising-sun
    $ cd rising-sun
    $ sudo chown -R play:www-data .
    $ find . -type d -exec chmod 775 {} \;
    $ find . -type f -exec chmod 664 {} \;
