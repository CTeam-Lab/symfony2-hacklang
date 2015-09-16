#! /bin/bash
set -e

SYMFONY_ENV=dev composer install --dev --no-interaction --prefer-source --no-progress
#app/console doctrine:migrations:migrate --no-interaction --env=dev
app/console doctrine:schema:update --force --env=dev
app/console assetic:dump web --env=dev
app/console assets:install web --env=dev
npm install
grunt --no-watch
