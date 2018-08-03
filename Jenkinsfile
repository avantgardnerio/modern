pipeline {
    agent { dockerfile true }
    environment {
        PATH = "/usr/local/bin:/u01/app/oracle/product/12.2.0/dbhome_1/bin:$PATH"
        HOME = "."
        CI = "true"
    }
    stages {
        stage('setup') {
            steps {
                sh "env"
                sh "pwd"
                sh "ls -la"
                sh "HOME=. yarn install && yarn build"                
                sh "sudo -u oracle /home/oracle/setup/dockerInit.sh"
                sh "sqlplus sys/Oradoc_db1 as SYSDBA /home/oracle/init.sql"
                sh "chromedriver --verbose --disable-ipv6 &"
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}