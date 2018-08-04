pipeline {
    agent {
        dockerfile {
            // args '-v $WORKSPACE:/ORCL'
        }
    }
    environment {
        PATH = "/u01/app/oracle/product/12.2.0/dbhome_1/bin:/usr/local/bin:/usr/bin:/bin:/snap/bin"
        HOME = "."
        CI = "true"
    }
    stages {
        stage('setup') {
            steps {
                sh "HOME=. yarn install && yarn build"
                sh "sudo -u oracle /home/oracle/setup/dockerInit.sh"
                sh "chromedriver --verbose --disable-ipv6 &"
                sh "netstat -anop"
            }
        }
        stage('Test') {
            steps {
                sh "netstat -anop"
                sh 'yarn test'
            }
        }
    }
}