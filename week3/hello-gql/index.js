'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema.js');
const db = require('./db/db');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  }),
);

db.on('connected', () => {
  console.log('db.connected');
});

app.listen(3000);
