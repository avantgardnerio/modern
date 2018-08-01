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
                sh "HOME=. yarn install"
                sh "sudo service mysql start && chromedriver --verbose --disable-ipv6 &"
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}