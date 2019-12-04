node {
    stage("Clean"){
        echo 'I solemnly swear that I know not to run this without committing changes I want to keep!'
        sh "git clean -dfxq"
        sh "git status"
    }
    stage("Setup"){
        echo 'Setup'
    }
    stage("Lint"){
        echo 'Lint'
    }
    stage("Test"){
        echo 'Test'
    }
    def git = checkout scm
    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
    stage("Deploy"){
        echo 'Deploy'
    }
}