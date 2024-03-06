# Serverless, AWS, NestJS, GraphQL and DynamoDB starter

## Description

A starter project that makes creating a deployable AWS Serverless project extremely easy.

## Technologies

- [AWS Lambda](https://aws.amazon.com/lambda)
- [AWS DynamoDB](https://aws.amazon.com/dynamodb)
- [Serverless](https://serverless.com/framework/docs/providers/aws/)
- [NestJS](https://docs.nestjs.com/)
- [NestJS GraphQL](https://docs.nestjs.com/graphql/quick-start)
- [NestJS Dynamoose](https://github.com/hardyscc/nestjs-dynamoose)

## Usage

```bash

npm install
```

After that find and replace `cantek-app-be` to your project name on the following files:

- package.json
- serverless.yml
- .env

## Setup AWS Credentials

1. [Sign up for an AWS account](https://serverless.com/framework/docs/providers/aws/guide/credentials#sign-up-for-an-aws-account)

2. Login to your AWS account and go to the **Identity & Access Management (IAM)** page.

3. Click on **Users** and then **Add user**. Enter a name in the first field to remind you this User is related to the Serverless Framework, like `serverless-admin`. Enable **Programmatic access** by clicking the checkbox. Click **Next** to go through to the Permissions page. Click on **Attach existing policies directly**. Search for and select **AdministratorAccess** then click **Next: Review**. Check to make sure everything looks good and click **Create user**.

4. View and copy the **API Key & Secret** to a temporary place. You'll need it in the next step.

## Setup Workstation

Install AWS CLI

- Windows: `choco install awscli`
- MacOS: `brew install awscli`

Config AWS CLI

```bash
$ aws configure

AWS Access Key ID [****************TKYQ]:
AWS Secret Access Key [****************yNO2]:
Default region name [us-east-1]:
Default output format [None]:
```

> Please enter your **AWS Access Key ID**, **AWS Secret Access Key** and **Default region name**

## Deployment

```bash
# deploy to AWS
$ npm run deploy
```

## Install DynamoDB local

```bash
# download dynamodb local into .dynamodb folder
$ npm run ddb:install
```

## Local Offline Development

```bash
# start dynamodb local
$ npm run ddb:start

# start serverless-offline server
$ npm run sls:offline

# start serverless-offline server and connect to online dynamodb
$ npm run sls:online
```

## Local NestJS Development - (Optional)

```bash
# start dynamodb local
$ npm run ddb:start

# start local nestjs server
$ npm start

# start local nestjs server in watch mode
$ npm run start:watch

# start local nestjs server and connect to online dynamodb
$ npm run start:online
```

## Tools

```bash
# re-generate the resources/dynamodb.yml from schemas
$ npm run genres
```

## Unit Testing

```bash
# run unit test
$ npm test

# run unit test with coverage
$ npm run test:cov
```

## E2E Testing

```bash
# start dynamodb local
$ npm run ddb:start

# run unit test with coverage
$ npm run test:e2e
```

## GraphQL Endpoint Test

- offline: http://localhost:3000/dev/graphql
- local: http://localhost:3000/graphql
- AWS: https://<your_aws_deployment_id>.execute-api.<your_aws_region>.amazonaws.com/dev/graphql

```graphql
mutation {
  createNotification(
    input: { targetId: "device1", id: "user1", content: "Hello World" }
  ) {
    id
  }
}
```

```graphql
query {
  notificationByUserId(id: "user1") {
    id
    targetId
    userId
    content
    createAt
  }
}
```

```graphql
query {
  notificationByTargetId(targetId: "device1") {
    id
    targetId
    userId
    content
    createAt
  }
}
```

```graphql
mutation {
  updateNotification(
    id: "1ca7726e-0af8-4ff1-8ef1-4eae97377162"
    input: { status: Deleted }
  ) {
    id
    targetId
    userId
    content
    createAt
  }
}
```

## RESTful Endpoint Test

> Please remove `/dev` from path if test using local nestjs mode

```
curl -X POST 'http://localhost:3000/dev/notification' \
  -H 'Content-Type: application/json' \
  --data-raw '{ "targetId": "device1", "userId": "user1", "content": "Hello" }'
```

```
curl -X GET 'http://localhost:3000/dev/notification?targetId=device1'
```

```
curl -X GET 'http://localhost:3000/dev/notification?userId=user1'
```

```
curl -X PATCH 'http://localhost:3000/dev/notification/a30f7101-2434-4443-87fa-493c9d9d3358' \
  -H 'Content-Type: application/json' \
  --data-raw '{ "status": "Deleted" }'
```

## Stay in touch

JFCM
