# Basic Nginx configuration

`$ sudo cp /etc/nginx/sites-available/cruited-frontend /etc/nginx/sites-available/new-dawn`
`$ sudo ln -s /etc/nginx/sites-available/new-dawn /etc/nginx/sites-enabled/new-dawn`

Modify the Nginx config file to enable PHP:
`$ sudo vi /etc/nginx/sites-available/new-dawn`

Modify those lines:

- `root /home/play/cruited-frontend/web;` -> `root /home/play/new-dawn/web;`
- `server_name frontend.cruited.8b.nu;` -> `server_name newdawn.8b.nu;`

`$ sudo service nginx reload`


# Add hostname to /etc/hosts

`$ sudo vi /etc/hosts`
`188.40.99.15 newdawn.8b.nu`


# Raise the upload limit

`$ sudo vi /etc/nginx/nginx.conf`

Add `client_max_body_size 8M;` at the bottom of the Basic Settings section.

`$ sudo service nginx reload`

`$ sudo vi /etc/php5/fpm/php.ini`

Update to `upload_max_filesize = 7M`

`$ sudo service php5-fpm restart`


# File permissions

`$ sudo chown -R www-data /home/play/new-dawn`
