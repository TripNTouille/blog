
docker run --rm -v $PWD:/data -w /data -e BUNDLE_APP_CONFIG=/data ruby bundle install --path vendor

docker run --rm -v $PWD:/data -w /data -e BUNDLE_APP_CONFIG=/data -p 4000:4000 ruby bundle exec jekyll serve --host 0.0.0.0 $@

