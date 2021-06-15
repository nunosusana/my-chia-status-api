FROM node:alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ARG NODE_ENVS=production
ENV NODE_ENV=${NODE_ENVS}

CMD ["node", "dist/main"]
