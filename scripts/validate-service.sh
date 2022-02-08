echo "Checking if application is running"

if [ "$(docker container inspect -f '{{.State.Status}}' blog-api-backend-1)" == "running" ] && [ "$(docker container inspect -f '{{.State.Status}}' blog-api-db-1)" == "running" ]; then
  echo "Application is running"
  docker container prune -f
  docker image prune -fa
  exit 0
else
  echo "Application is not running"
  docker container prune -f
  docker image prune -fa
  exit 1
fi