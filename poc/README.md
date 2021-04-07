# Metterport PoC

This a proof of concept of a catalog of items inside a 3d space using the Matterport SDK.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Docker (https://hub.docker.com/editions/community/docker-ce-desktop-mac/)
- NodeJs https://nodejs.org/es/

Also yarn or npm

```
brew install yarn
```

### Installing

A step by step series of examples that tell you how to get a development env running

- To run the backend

First go to /packages/backend and run

```
make dev-build
```

this only has to be done the first time you run the backend, next time just run

```
make dev
```

to clean your data base run the next command while your backend is running

```
make dev-clean
```

- To run the frontend

First go to /packages/frontend and run

```
yarn install
```

or

```
npm install
```

this will install all needed dependencies.

Once this is done run

```
yar start
```

go to your localhost:3000/ to see it running

## Authors

- **The Ksquare Group** - _Initial work_ - [The Ksquare Group](https://www.ksquareinc.com/about-us/)
