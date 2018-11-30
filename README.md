# hazy-webapp

> hazy web application

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## How to deploy on [Fandogh](https://fandogh.cloud)

### One time steps

- Install [Fandogh CLI](https://docs.fandogh.cloud/docs/getting-started.html)
- Run `fandogh image init --name hazy-webapp`

### Publish image

```./publish_imagesh $version```

### Deploy Service
```./deploy_service.sh $version```

<b>Note:</b> Version should be publish before being used in `deploy_service`


For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
