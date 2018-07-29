pipeline {
    agent { dockerfile true }
    environment {
        PATH = "/usr/local/bin:$PATH"
    }
    stages {
        stage('setup') {
            steps {
                sh "env"
            }
        }
        stage('Test') {
            steps {
                sh 'yarn test'
            }
        }
    }
}