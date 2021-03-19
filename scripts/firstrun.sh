#!/bin/sh

#
# LogUI Server First Run Script
# Creates an environment file, .env, for the Docker instance to use.
#
# Author: David Maxwell
# Date: 2021-03-19
#

HOSTNAME=$(uname -n)
SECRET_KEY=$(LC_CTYPE=C tr -dc A-Za-z0-9_\!\@\#\$\%\^\*\(\)-+= < /dev/urandom | head -c 50 | xargs)
DB_PASSWORD=$(LC_CTYPE=C tr -dc A-Za-z0-9 < /dev/urandom | head -c 8 | xargs)

cp ../.env.example ../.env
awk -v hostname="$HOSTNAME" -v secret_key="$SECRET_KEY" -v password="$DB_PASSWORD" '{gsub("<<HOSTNAME>>", hostname, $0); gsub("<<KEY>>", secret_key, $0); gsub("<<PASSWORD>>", password, $0); print}' ../.env > ../.tmp && mv -f ../.tmp ../.env