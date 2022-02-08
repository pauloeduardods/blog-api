#!/bin/bash

echo "Stopping the application"

docker ps --filter name=blog-api -aq | xargs docker stop
docker container prune -f
docker image prune -af