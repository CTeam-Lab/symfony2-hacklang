#! /bin/bash
set -e

SYMFONY_ENV=prod composer install --no-dev --no-interaction --prefer-dist --no-progress -o
#app/console doctrine:migrations:migrate --env=prod --no-interaction
#app/console doctrine:schema:update --env=prod --force
app/console assetic:dump web --env=prod
app/console assets:install web --env=prod
