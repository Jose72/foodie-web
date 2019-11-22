docker build -f Dockerfile -t $DOCKER_USERNAME/7552-web-app .
docker tag $DOCKER_USERNAME/7552-web-app registry.heroku.com/$HEROKU_APP_NAME/web
docker push josemorelli/7552-web-app
docker push registry.heroku.com/$HEROKU_APP_NAME/web
heroku container:release web --app $HEROKU_APP_NAME