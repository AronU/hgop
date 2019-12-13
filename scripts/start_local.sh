#!/bin/bash

set -euxo pipefail

docker build game_api -t andrilor/jenkins:dev
(cd game_client && npm run build)
docker build game_client -t andrilor/jenkinsfrontend:dev

API_URL=localhost GIT_COMMIT=dev docker-compose up