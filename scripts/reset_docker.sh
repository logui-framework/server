#!/bin/bash

#
# 
#
#

docker volume rm server_data
docker volume rm server_static

docker image rm server_websocket-worker
docker image rm server_http-worker
docker image rm server_proxy