#!/bin/bash

docker exec -it server_http-worker_1 python manage.py createsuperuser --username=$1