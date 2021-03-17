#
# LogUI Server Proxy Dockerfile
# 
# Author: David Maxwell
# Date: 2020-11-16
#

FROM nginx:1.17-alpine

LABEL maintainer="maxwelld90@acm.org"

COPY ./nginx.conf /etc/nginx
COPY ./responses/502.html /usr/share/nginx/html/502.html
COPY ./responses/favicon.svg /usr/share/nginx/html/favicon.svg
COPY ./responses/logo.svg /usr/share/nginx/html/logo.svg
COPY ./responses/styles.css /usr/share/nginx/html/styles.css

CMD ["nginx", "-g", "daemon off;"]