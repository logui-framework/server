#!/bin/bash

cd ../worker
rm db.sqlite3
python manage.py makemigrations
python manage.py migrate