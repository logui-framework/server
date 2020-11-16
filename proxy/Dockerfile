FROM nginx:1.17-alpine

COPY ./index.html /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]