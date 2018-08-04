pipeline {
    agent { dockerfile true }
    environment {
        PATH = "/u01/app/oracle/product/12.2.0/dbhome_1/bin:/usr/local/bin:/usr/bin:/bin:/snap/bin"
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
                sh "sudo chmod ugo+r -R /home"
                sh "sudo chmod ugo+x /home/oracle"
                sh "cd /home/oracle/ && /u01/app/oracle/product/12.2.0/dbhome_1/bin/sqlplus sys/Oradoc_db1 as SYSDBA @init.sql"
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