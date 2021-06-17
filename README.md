## Description

Connects your CHIA farms to whatever you want. 


## Installation and Running 

- Run the script `generate_ssl_keys.sh` under the `ssl` folder in order to create your own key and certificate. 

- Running directly on host - requires `npm`
```bash
# install the node modules
$ npm install

# development
$ npm run start:dev

# production mode
$ npm run start:prod
```
  
- Docker version
```bash
# docker mode
$ docker-compose up --build -d
```
It is available as a docker image too. Check: https://hub.docker.com/repository/docker/nsusana/my-chia-status  
  
The docker version require docker installation, aswell as docker-compose.


## Dependencies 

This API depends on chia-blockchain.  

## Specification
<p>
  Check the API specification <a href="https://github.com/nunosusana/my-chia-status-api/blob/main/docs/Wiki/SPECIFICATION.md" target="blank">here</a>.
</p>

# This API was developed using NestJS
<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
