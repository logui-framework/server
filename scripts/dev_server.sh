#!/bin/bash

cd ../worker
rm -rf collectedstatic
python manage.py collectstatic --noinput
python manage.py compress
python manage.py runserver