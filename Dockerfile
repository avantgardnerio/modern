FROM ubuntu:18.04

RUN apt-get update

RUN apt-get install -y curl gnupg

# node
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash && \
    apt-get install -y nodejs && \
    npm install -g yarn

# MariaDB
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y mariadb-server && \
    service mysql start && \
    mysql -u root -e "create database modern;" && \
    mysql -u root -e "create database modern_test;" && \
    mysql -u root -e "GRANT ALL PRIVILEGES on *.* to 'root'@'localhost' IDENTIFIED BY 'password'; FLUSH PRIVILEGES;"

# jenkins
RUN apt-get install -y sudo && \
    useradd -u 124 jenkins && \
    usermod -aG sudo jenkins && \
    echo "jenkins ALL=(ALL:ALL) NOPASSWD: ALL" > /etc/sudoers.d/jenkins

# chromedriver
RUN apt-get install -y wget unzip libglib2.0-0 libx11-6 libnss3 && \
    wget https://chromedriver.storage.googleapis.com/2.41/chromedriver_linux64.zip && \
    unzip chromedriver_linux64.zip && \
    mv chromedriver /usr/bin && \
    chromedriver --version
    
# chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable
