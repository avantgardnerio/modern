FROM ubuntu:18.04

RUN apt-get update

RUN apt-get install -y curl gnupg

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash && \
    apt-get install -y nodejs

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y mariadb-server
