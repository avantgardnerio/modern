FROM ubuntu:18.04

RUN apt-get update

RUN apt-get install -y curl gnupg

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash && \
    apt-get install -y nodejs && \
    npm install -g yarn

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y mariadb-server && \
    service mysql start && \
    mysql -u root -e "create database modern;" && \
    mysql -u root -e "create database modern_test;" && \
    mysql -u root -e "GRANT ALL PRIVILEGES on *.* to 'root'@'localhost' IDENTIFIED BY 'password'; FLUSH PRIVILEGES;"

RUN apt-get install -y sudo && \
    useradd -u 124 jenkins && \
    usermod -aG sudo jenkins && \
    echo "jenkins ALL=(ALL:ALL) NOPASSWD: ALL" > /etc/sudoers.d/jenkins
