#!/bin/bash
# with this || We can abandon the command if anything is wrong and at the same time stade where things went wrong
set -euxo pipefail

GIT_COMMIT=$1

docker build -t andrilor/jenkins:$GIT_COMMIT game_api/ || { echo 'docker build failed' ; exit 1; }
cd game_client
npm run build 
docker build -t andrilor/jenkinsfrontend:$GIT_COMMIT game_client/ || { echo 'docker build failed' ; exit 1; }
exit 0