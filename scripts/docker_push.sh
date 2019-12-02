#!/bin/bash

GIT_COMMIT=$1|| { echo 'Commit failed' ; exit 1; }
#Docker push. Will exit if it fails. 
docker push username/repo:$GIT_COMMIT || { echo 'docker push failed' ; exit 1; }