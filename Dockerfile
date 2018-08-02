FROM container-registry.oracle.com/database/enterprise:12.2.0.1

# RUN yum check-update

USER root

RUN yum install -y curl sudo gcc-c++ make

# node
RUN curl --silent --location https://rpm.nodesource.com/setup_10.x | bash - && \
    yum -y install nodejs && \
    curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo && \
    yum install -y yarn

# jenkins
RUN useradd -u 124 jenkins && \
    usermod -aG wheel jenkins && \
    echo "jenkins ALL=(ALL:ALL) NOPASSWD: ALL" > /etc/sudoers.d/jenkins

# chromedriver
# RUN apt-get install -y wget unzip libglib2.0-0 libx11-6 libnss3 && \
#     wget https://chromedriver.storage.googleapis.com/2.41/chromedriver_linux64.zip && \
#     unzip chromedriver_linux64.zip && \
#     mv chromedriver /usr/bin && \
#     chromedriver --version
    
# chrome
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
#     echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list && \
#     apt-get update && \
#     apt-get install -y google-chrome-stable

USER oracle
