pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('Frontend/library-frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                REM Remove old frontend folder if exists
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\fullstack-react" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\fullstack-react"
                )

                REM Create new folder
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\fullstack-react"

                REM Copy build files
                xcopy /E /I /Y Frontend\\library-frontend\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\fullstack-react"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('Backend/Library-springboot') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                REM Remove old backend deployment if exists
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\fullstack-springboot.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\fullstack-springboot.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\fullstack-springboot" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\fullstack-springboot"
                )

                REM Copy new WAR file (correct WAR name from pom.xml)
                copy "Backend\\Library-springboot\\target\\fullstack-springboot.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\fullstack-springboot.war"
                '''
            }
        }

    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Pipeline Failed. Check Jenkins logs.'
        }
    }
}