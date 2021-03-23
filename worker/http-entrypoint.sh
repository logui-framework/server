#!/bin/sh

#
# LogUI Server HTTP Worker Entrypoint Script
# 
# Author: David Maxwell
# Date: 2021-03-23
#


echo "Starting up HTTP worker..."

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Compressing static files (building app)..."
python manage.py compress

echo "Migrating database..."
python manage.py makemigrations
python manage.py migrate

echo "LogUI HTTP server is running"
gunicorn worker.wsgi:logui_application -b 0.0.0.0:8000 -w 4