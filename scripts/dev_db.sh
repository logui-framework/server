#!/bin/bash

cd ../worker
rm db.sqlite3
python manage.py makemigrations  --settings=worker.settings.development
python manage.py migrate  --settings=worker.settings.development
python manage.py createsuperuser  --settings=worker.settings.development