FROM node:10-alpine

WORKDIR /usr/src/build

COPY package.json yarn.lock ./

RUN yarn && yarn cache clean

COPY . ./

RUN node node_modules/.bin/ng build --prod

# Build Stage 2
# Copy dist folder into tiny nginx image
FROM nginx:1-alpine
COPY mime.types nginx.conf /etc/nginx/
COPY --from=0 /usr/src/build/dist/ui /usr/share/nginx/html/