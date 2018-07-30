FROM ubuntu:18.04

RUN apt-get update

RUN apt-get install -y nodejs npm

RUN sed -i "s/^exit 101$/exit 0/" /usr/sbin/policy-rc.d && \
    RUNLEVEL=1 DEBIAN_FRONTEND=noninteractive apt-get install -y mysql-server
