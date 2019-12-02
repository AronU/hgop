#!/bin/bash
# with this || We can abandon the command if anything is wrong and at the same time stade where things went wrong
GIT_COMMIT=$1 || { echo 'Commit failed' ; exit 1; }

docker build -t andrilor/hgop:$GIT_COMMIT item_repository/ || { echo 'docker build failed' ; exit 1; }
