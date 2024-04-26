FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Reduce the size of the image
FROM alpine:3

RUN apk add --update nodejs npm && apk cache clean
RUN addgroup -S node && adduser -S node -G node
USER node
RUN mkdir /home/node/code
WORKDIR /home/node/code
COPY --from=build --chown=node:node /app .
EXPOSE 3000

CMD ["npm", "start"]