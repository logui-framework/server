#!/bin/bash

# Simple Bash script to assign a Django-generated secret key.
# DO NOT USE this if you have already set up your environment.
#
# Author: David Maxwell
# Date: 2020-11-17
#

key=$(python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())");
escaped=$(printf "%q" $key);

sed "s/SECRET_KEY=.*/SECRET_KEY=${escaped}/g" ../.env > ../.newenv;
rm ../.env;
mv ../.newenv ../.env;