node {
    def git = checkout scm
    stage("Clean"){
        echo 'I solemnly swear that I know not to run this without committing changes I want to keep!'
        sh "git clean -dfxq"
        sh "git status"
    }
    stage("Setup"){
        sh "npm install --prefix=./game_api"
    }
    stage("Lint"){
        sh "npm run eslint --prefix=./game_api"
    }
    stage("Unit Test"){
        sh "npm run test:unit --prefix=./game_api"
    }
    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
    stage("Deploy"){
        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT}"
    }
}