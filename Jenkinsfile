pipeline {
    agent { dockerfile true }
    environment {
        PATH = "/usr/local/bin:$PATH"
    }
    stages {
        stage('setup') {
            steps {
                sh "env"
                sh "pwd"
                sh "ls -la"
                sh "npm install"
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}