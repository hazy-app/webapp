
#!/bin/bash
export NODE_ENV="production"
export BASE_URL="https://hazy.herokuapp.com"
export RECAPTCHA_SITE_KEY="6Lfj3HwUAAAAAGKohyJRasw6EsMoQGu2i0dOw1Ti"
export DIRECTION="ltr"
export LANG="en"

npm install
npm run generate

git clone https://github.com/hazy-app/hazy-app.github.io



cd ./hazy-app.github.io
git rm -r *
cp -r ../dist/* ./
git add --all
git commit -m 'updated'
git push -f origin master

cd ..
rm -rf ./hazy-app.github.io