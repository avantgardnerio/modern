FROM container-registry.oracle.com/database/enterprise:12.2.0.1

# RUN yum check-update

USER root

RUN yum install -y curl sudo gcc-c++ make wget

# node
RUN curl --silent --location https://rpm.nodesource.com/setup_10.x | bash - && \
    yum -y install nodejs && \
    curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo && \
    yum install -y yarn

# jenkins
RUN useradd -u 124 jenkins && \
    usermod -aG wheel jenkins && \
    echo "jenkins ALL=(ALL:ALL) NOPASSWD: ALL" > /etc/sudoers.d/jenkins
  
# chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm && \
    yum install -y ./google-chrome-stable_current_*.rpm

# chromedriver
RUN wget https://chromedriver.storage.googleapis.com/2.41/chromedriver_linux64.zip && \
    unzip chromedriver_linux64.zip && \
    mv chromedriver /usr/bin && \
    chromedriver --version

# oracle
USER oracle
RUN sed -i s/wait/echo/g /home/oracle/setup/dockerInit.sh
