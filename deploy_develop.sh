docker build -f Dockerfile -t $DOCKER_USERNAME/7552-web-app:develop .
docker tag $DOCKER_USERNAME/7552-web-app:develop registry.heroku.com/$HEROKU_APP_NAME_DEVELOP/web
docker push josemorelli/7552-web-app:develop
docker push registry.heroku.com/$HEROKU_APP_NAME_DEVELOP/web
heroku container:release web --app $HEROKU_APP_NAME_DEVELOP