#!/bin/bash
set -euxo pipefail
GIT_COMMIT=$1 
#Docker push. Will exit if it fails. 
docker push andrilor/jenkins:$GIT_COMMIT
exit 0