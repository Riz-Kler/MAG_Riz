pipeline {
  agent any
  stages {
    stage('Build & Test') {
      steps {
        sh 'npm ci'
        sh 'npm test -- --coverage'
      }
      post { always { junit 'junit-report.xml' } }
    }
    stage('SonarQube') {
      environment { scannerHome = tool 'SonarScanner' }
      steps {
        withSonarQubeEnv('SonarQubeServer') {
          sh "${scannerHome}/bin/sonar-scanner"
        }
      }
    }
    stage('Quality Gate') {
      steps {
        timeout(time: 10, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}
