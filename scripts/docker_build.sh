#!/bin/bash
# with this || We can abandon the command if anything is wrong and at the same time stade where things went wrong
GIT_COMMIT=$1 || { echo 'Commit failed' ; exit 1; }

docker build -t andrilor/jenkins:$GIT_COMMIT game_api/ || { echo 'docker build failed' ; exit 1; }
