FROM node:8

WORKDIR /app 

COPY . /app 
ENV BASE_URL="https://hazy-api.herokuapp.com" 
ENV DIRECTION="ltr" 
ENV HOST="0.0.0.0" 
ENV PORT="3003" 
ENV NODE_ENV="production" 
ENV NPM_CONFIG_PRODUCTION="false" 
ENV RECAPTCHA_SITE_KEY="6Lfj3HwUAAAAAGKohyJRasw6EsMoQGu2i0dOw1Ti" 
EXPOSE 3003
RUN npm install 
RUN npm run build 
CMD ["npm","start"]

