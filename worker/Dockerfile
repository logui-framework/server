#
# LogUI Server HTTP Worker Process Dockerfile
# Replace the CMD to launch the Websocket worker instead.
# 
# Author: David Maxwell
# Date: 2021-03-16
#

FROM python:3.8-alpine

LABEL maintainer="maxwelld90@acm.org"

ARG SECRET_KEY

RUN apk add --update --no-cache \
        gcc \
        libc-dev \
        libffi-dev \
        libressl-dev \
        musl-dev \
        postgresql-dev \
        nodejs \
        npm

RUN mkdir -p /logui/worker/
RUN npm install -g @babel/core @babel/cli browserify less uglify-js

COPY ./requirements/requirements.txt /logui/worker/requirements.txt
RUN pip install -r /logui/worker/requirements.txt --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org

COPY ./worker /logui/worker
COPY ./app /logui/worker/app
COPY ./static /logui/worker/copied-static

WORKDIR /logui/worker

CMD ["/logui/worker/http-entrypoint.sh"]