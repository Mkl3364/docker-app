## Docker App

Docker app is a small app which give daily advice.

## Explanation

The project have a frontend in NextJs and a backend in NestJs. Each project have a Dockerfile built for the development environment.

The project also have a docker-compose file to gather all containers and make them communicate. In order to work this a dockerised app, a volume has been set for each of the app (frontend, backend) and also the database.

The database used is a relational MySQL database containing two tables :
- User
- Likes

The goal of the user table is to store user credentials and the goal of the Likes table is to store content of liked advice related to an user id

A database manager allows to quicly view and manage entities.

For a statistical point of view of the app, a grafana container is used to send a discord message when a new entry is made in the user table.
## Dockerfile

Frontend app :

```
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

Backend app : 

```
FROM node:latest
WORKDIR /api
COPY tsconfig*.json ./
COPY package*.json ./
RUN npm install
COPY src/ src/
EXPOSE 3001
CMD [ "yarn", "start", "dev" ]
```

## Docker compose

```
version: '3'

services:
  database:
    image: mysql:latest
    container_name: docker-app-database
    volumes:
      - ./init:/docker-entrypoint-initdb.d
      - /Users/mickaelbrunet/development/docker-app-vol:/var/lib/mysql
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: admin
      MYSQL_DATABASE: advice
      MYSQL_USER: mysql
      MYSQL_PASSWORD: admin
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 10s
      retries: 10
    networks:
      - network-backend

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    restart: always
    container_name: docker-app-pma
    environment:
      PMA_HOST: database
    ports:
      - "8080:80"
    depends_on:
      database:
        condition: service_healthy

    networks:
      - network-backend
  
  docker-app-frontend:
    build: .
    container_name: docker-app-frontend
    ports:
      - 3002:3002
    networks:
      - network-backend
    volumes:
      - .:/app

  docker-app-backend:
    build:
      context: ../docker-app-backend/docker-app-backend
      dockerfile: dev.dockerfile
    container_name: docker-app-backend
    depends_on:
      database:
        condition: service_healthy
    ports:
      - 3001:3001
    env_file:
      - ../docker-app-backend/docker-app-backend/.env
    restart: always
    networks:
      - network-backend
    volumes:
      - ../docker-app-backend/docker-app-backend:/api

  grafana:
    image: grafana/grafana:latest
    container_name: docker-app-grafana
    ports:
      - 3000:3000
    networks:
      - network-backend

volumes:
  docker-app-vol:

networks:
  network-backend:
```

### Encountered difficulties

Dockerfile :
- EXPOSE directive :
I often went wrong with the correct port to expose.
- RUN and CMD directives :
I needed to understand the difference of the two directives and their behaviour within a container.

Fortunately there are a lot of example across the web.

Docker-compose

- database container :
I forgot to add the network to the database container. I could have used two networks, one for the frontend to the backend and one for the backend to the database. Instead I used one single network for all of the container who need to communicate in the dockerized environment.

- I now know that some container needs to wait for the connection of others container. the depends_on and healthcheck can help us avoid error during mount of the container.

## Setup 

1. Clone both frontend and backend app
2. Type docker compose up command within the frontend project to setup containers.

