pipeline {
  agent any

  environment {
    IMAGE_NAME = 'amolbrand254/phone_validate_api'
    DOCKER_CREDENTIALS_ID = 'dockerhub-creds' 
  }

  stages {
    stage('Checkout Source') {
      steps {
        checkout scm
        echo "✅ Code checked out from Git"
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          echo "🔧 Building Docker image: ${IMAGE_NAME}:latest"
          docker.build("${IMAGE_NAME}:latest")
        }
      }
    }

    stage('Push Docker Image to Docker Hub') {
      steps {
        script {
          echo "🚀 Logging in and pushing image to Docker Hub"
          docker.withRegistry('', "${DOCKER_CREDENTIALS_ID}") {
            docker.image("${IMAGE_NAME}:latest").push()
          }
        }
      }
    }
  }

  post {
    success {
      echo '✅ CI Pipeline complete: Image built and pushed successfully!'
    }
    failure {
      echo '❌ CI Pipeline failed. Check build logs for errors.'
    }
  }
}
