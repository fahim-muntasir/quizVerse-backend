FROM node:18-alpine

# Set working directory
WORKDIR /app

COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Ensure dist/index.js has execution permissions
RUN chmod +x dist/index.js 

EXPOSE 8001

CMD ["yarn", "start"]
