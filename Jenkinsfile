node {
    def git = checkout scm
    stage("Clean"){
        echo 'I solemnly swear that I know not to run this without committing changes I want to keep!'
        sh "git clean -dfxq"
        sh "git status"
    }
    stage("Setup"){
        dir("game_api") {
            sh "npm install"
        }
    }
    stage("Lint"){
        dir("game_api") {
            sh "npm run eslint"
        }
    }
    stage("Unit Test"){
        dir("game_api") {
            sh "npm run test:unit"
            step([
                $class: 'CloverPublisher',
                cloverReportDir: 'coverage',
                cloverReportFileName: 'clover.xml',
                healthyTarget: [methodCoverage: 80, conditionalCoverage: 80, statementCoverage: 80],
                unhealthyTarget: [methodCoverage: 50, conditionalCoverage: 50, statementCoverage: 50],
                failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]
            ])
        }
    }
    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
    stage("API Test") {
        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} apitest"
        dir("game_api") {
            sh("./../scripts/test_api.sh")
        }
        dir("/var/lib/jenkins/terraform/hgop/apitest") {
            sh "terraform destroy -auto-approve  -var environment=apitest || exit 1"
        }
    }
    stage("Capacity Test") {
        echo "hello not working"
        //sh "npm run test:capacity --prefix game_api"
    }
    stage("Deploy"){
        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} production"
    }
}