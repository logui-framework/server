#!/bin/sh

#
# LogUI Server User Creation Script
# Creates a new user account for the LogUI server control app.
# Assumes that the LogUI server docker instance is running, and that the HTTP worker is at the standard name.
#
# Author: David Maxwell
# Date: 2021-03-19
#

docker exec -it server_http-worker_1 python manage.py createsuperuser --username=$1