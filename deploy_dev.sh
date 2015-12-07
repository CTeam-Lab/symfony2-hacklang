#! /bin/bash
set -e

## Deploy Backend
cd Backend/
SYMFONY_ENV=dev composer install --no-interaction --prefer-source --no-progress
#app/console doctrine:migrations:migrate --no-interaction --env=dev
app/console doctrine:schema:update --force --env=dev
app/console assetic:dump web --env=dev
app/console assets:install web --env=dev

cd ../

## Deploy Frontend
cd Frontend/
npm install
tsd install
#grunt --no-watch
