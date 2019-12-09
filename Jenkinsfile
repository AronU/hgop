node {
    def git = checkout scm
    stage("Clean"){
        echo 'I solemnly swear that I know not to run this without committing changes I want to keep!'
        sh "git clean -dfxq"
        sh "git status"
    }
    stage("Setup"){
        sh "npm install --prefix game_api"
    }
    stage("Lint"){
        sh "npm run eslint --prefix game_api"
    }
    stage("Unit Test"){
        sh "npm run test:unit --prefix game_api"
        //step([
        //    $class: 'CloverPublisher',
        //    cloverReportDir: 'coverage',
        //    cloverReportFileName: 'clover.xml',
        //    healthyTarget: [methodCoverage: 80, conditionalCoverage: 80, statementCoverage: 80],
        //    unhealthyTarget: [methodCoverage: 50, conditionalCoverage: 50, statementCoverage: 50],
        //    failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]
        //])
    }
    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
    stage("API Test") {
        sh "npm run test:api --prefix game_api"
    }
    stage("Capacity Test") {
        sh "npm run test:capacity --prefix game_api"
    }
    stage("Deploy"){
        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT}"
    }
}