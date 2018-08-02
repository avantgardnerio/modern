pipeline {
    agent { dockerfile true }
    environment {
        PATH = "/usr/local/bin:$PATH"
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
                sh "/home/oracle/setup/dockerInit.sh && chromedriver --verbose --disable-ipv6 &"
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}