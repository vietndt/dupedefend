FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

FROM nginx:latest

COPY --from=build /usr/local/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf