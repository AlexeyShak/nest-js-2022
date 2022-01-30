# RS School TypeScript

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/)
- Docker HUB - [Create Docker Hub account](https://hub.docker.com/)

## Downloading

```
git clone https://github.com/AlexeyShak/nest-js-2022.git
```

## Checkout to development branch

```
git checkout development
```
## Description


## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start:dev
```

## Running the app in docker

```bash
$ docker-compose up -d --build
```
## Test

```bash
$ npm run test:auth
```
## Fastify mode 

In `.env` file make sure that `USE_FASTIFY=true`

## Fastify & Express comparison

# Fastify
|                                 |       |                                                                          
|---------------------------------|-------|
| http.codes.200                  | 600   |
| http.codes.201                  | 300   |
| http.codes.204                  | 300   |
| http.request_rate               | 20/sec| 
| http.requests                   | 1200  |
| min                             | 2     |
| max                             | 58    |
| median                          | 13.1  |
| p95                             | 22    | 
| p99                             | 27.9  |
| http.responses                  | 1200  |
| vusers.completed                | 300   |
| vusers.created name.0:          | 300   | 
| vusers.session_length           | 300   |
| min                             | 34.3  |
| max                             | 138.9 |
| median                          | 51.9  |
| p95                             | 65.7  | 
| p99                             | 115.6 |

# Express
|                                 |       |                                                                          
|---------------------------------|-------|
| http.codes.200                  | 600   |
| http.codes.201                  | 300   |
| http.codes.204                  | 300   |
| http.request_rate               | 20/sec| 
| http.requests                   | 1200  |
| min                             | 2     |
| max                             | 58    |
| median                          | 10.9  |
| p95                             | 22    | 
| p99                             | 26.8  |
| http.responses                  | 1200  |
| vusers.completed                | 300   |
| vusers.created name.0:          | 300   | 
| vusers.session_length           | 300   |
| min                             | 38.3  |
| max                             | 94    |
| median                          | 54.1  |
| p95                             | 66    | 
| p99                             | 79.1  |