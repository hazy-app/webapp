VERSION=$1
fandogh service apply -f fandogh-manifest.yml -p IMAGE_VERSION=$VERSION
