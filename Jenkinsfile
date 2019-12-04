node {
    def git = checkout scm
    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
    stage("Clean"){
        echo 'I solemnly swear that I know not to run this without committing changes I want to keep!'
        git clean -dfxq
        git status
    }
}