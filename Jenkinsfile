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
                sh "sudo service mysql start"
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}