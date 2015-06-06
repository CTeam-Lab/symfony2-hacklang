#! /bin/bash
set -e

cd BackendApp
SYMFONY_ENV=prod composer install --no-interaction --prefer-source --no-progress
#app/console doctrine:migrations:migrate --no-interaction --env=dev
app/console doctrine:schema:update --force --env=dev
app/console assetic:dump web --env=dev
app/console assets:install web --env=dev

cd ..

#cd FrontendApp
#npm install
#grunt bower
#grunt --no-watch

#cd ..
