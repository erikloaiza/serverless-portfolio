# Serverless Portfolio

this repository contains a aws api-gateway/lambda based fullstack portfolio application

## Technologies

- infrasctructure
  - [AWS Api Gateway](https://aws.amazon.com/es/api-gateway/)
  - [AWS Lambda](https://aws.amazon.com/es/lambda/)
  - [AWS DynamoDB](https://aws.amazon.com/es/dynamodb/)
- Backend
  - [NodeJs](https://nodejs.org/es/)
  - [AWS Data Mapper](https://github.com/awslabs/dynamodb-data-mapper-js)
- Frontend
  - [React](https://es.reactjs.org/) (with SSR)
- Development
  - [Typescript](https://www.typescriptlang.org/) (JS with super powers)
  - [Google Typescript Guidelines](https://github.com/google/gts) (eslint/typescript code style)
  - [Husky](https://typicode.github.io/husky/#/) (to hook scripts on commits)
  - [Eslint](https://eslint.org/) ( for linting & rules)
  - [Jest](https://jestjs.io/docs/expect) (for testing)
  - [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) (for local simumlate aws serverless environment)
  - [Faker](http://marak.github.io/faker.js/) (to seed database)

## _Requirements_

- Node: 12.x.x or greater + NPM, 6.x.x or greater
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html): 1.16.0 or greater
  - [Docker](https://www.docker.com/) (for building image with SAM CLI)

As Docker takes a lot of RAM is suggested to run on at least 8gb of RAM for local develoment & testing

# Run the app

to run the app clone the repository, setup environment variables in template.yml & run `npm start`.

### Endpoints

on local machine `host: http://localhost:3000`

- GET {host}/{id} Returns the Portfolio (HTML)
- GET {host}/api?id={id} returns the Portfolio object (JSON)
- PUT {host}/api?id={id} updates the portfolio object (JSON)

## Models

### Portfolio

```JSON
{
    "id": string,
    "firstName": string,
    "lastName": string,
    "profileImage": string,
    "description": string,
    "twitterProfile": string,
    "createdAt": Date,
    "updatedAt": Date,
}
```

# Scripts

The repository is based on npm scripts

### start

after clone, run this command & autommatically get install + build and starts the server at http://localhost:3000

```sh
npm start
```

### dev

sames as start but with watcher events to see changes in realtime

```sh
npm run dev
```

### build

builds the app to /dist directory

```sh
npm build
```

### seed

creates fake data on database with Faker.js, see src/seeders, (requires a .env file with sames env variables defined in template.yml)

```sh
npm run seed
```

### test

runs automated tests (requires a .env file with sames env variables defined in template.yml)

```sh
npm test
```

# TimeReport

| Phase          | Total   |
| -------------- | ------- |
| Structure      | 1h      |
| Api & Database | 10h     |
| Testing        | 2h      |
| Front          | 4h      |
| **TOTAL**      | **17h** |
