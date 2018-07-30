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
                sh "HOME=. npm install"
                sh "chown -R mysql:mysql /var/lib/mysql && mysqld_safe &"
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}