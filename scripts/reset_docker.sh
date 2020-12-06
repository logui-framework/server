#!/bin/bash

#
# 
#
#

docker volume rm loguiserver_data
docker volume rm loguiserver_static

docker image rm loguiserver_http-worker
docker image rm loguiserver_websocket-worker
docker image rm loguiserver_proxy