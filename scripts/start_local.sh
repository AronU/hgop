#!/bin/bash

set -euxo pipefail

docker build game_api -t ironpeak/game_api:dev
(cd game_client && npm run build)
docker build game_client -t ironpeak/game_client:dev

API_URL=localhost GIT_COMMIT=dev docker-compose up