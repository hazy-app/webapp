version=$1
fandogh image publish --version $1 || echo "ERROR PUBLISHING IMAGE"
