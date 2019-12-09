#!/bin/bash

set -euxo pipefail

docker build game_api -t andrilor/jenkins:dev
GIT_COMMIT=dev docker-compose up