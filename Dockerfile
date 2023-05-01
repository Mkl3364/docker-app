## Production

# FROM node:18
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# EXPOSE 3000
# CMD ["npm", "start"]

## docker build -f Dockerfile . -t docker/12345
## docker run -p 3000:3000 docker/12345




## Development

FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

## docker build -f Dockerfile . -t docker/12345
## docker run -p 3000:3000 docker/12345