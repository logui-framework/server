#
# LogUI Server Proxy Dockerfile
# 
# Author: David Maxwell
# Date: 2020-11-16
#

FROM nginx:1.17-alpine

LABEL maintainer="maxwelld90@acm.org"

COPY ./nginx.conf /etc/nginx
COPY ./responses /usr/share/nginx/html/responses

CMD ["nginx", "-g", "daemon off;"]