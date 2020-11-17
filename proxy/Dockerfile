#
# LogUI Server Proxy Dockerfile
# 
# Author: David Maxwell
# Date: 2020-11-16
#

FROM nginx:1.17-alpine

LABEL maintainer="maxwelld90@acm.org"

COPY ./nginx.conf /etc/nginx

CMD ["nginx", "-g", "daemon off;"]