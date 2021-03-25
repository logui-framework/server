@ECHO OFF

REM  
REM  LogUI Server User Creation Script (Windows Batch version)
REM  Creates a new user account for the LogUI server control app.
REM  Assumes that the LogUI server docker instance is running, and that the HTTP worker is at the expected container name.
REM  
REM  Author: David Maxwell
REM  Date: 2021-03-25
REM  

docker exec -it logui_http-worker_1 python manage.py createsuperuser --username=%1