#!/bin/bash

cd ../worker
rm -rf collectedstatic
python manage.py collectstatic --noinput --settings=worker.settings.development
python manage.py compress --settings=worker.settings.development
python manage.py runserver --settings=worker.settings.development