
docker run --rm -v ${PWD}:/data -w /data -e BUNDLE_APP_CONFIG=/data ruby:2.5.3 bundle install --path vendor

docker run --rm -v ${PWD}:/data -w /data -e BUNDLE_APP_CONFIG=/data -p 4000:4000 ruby:2.5.3 bundle exec jekyll serve --config _config.yml,_config_dev.yml --host 0.0.0.0 $@

