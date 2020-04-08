'use strict';

require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');
const db = require('./db/db');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const passport = require('./utils/pass');
const cors = require('cors');
//const bcrypt = require('bcrypt');
//const saltRound = 12;

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// normally, that's the user create/update route
/*app.get('/', async (req, res) => {
  const hash = await bcrypt.hash('qwer', saltRound);
  res.send(`hash of password saved to db (normally): ${hash}`);
});*/

// dummy function to set user (irl: e.g. passport-local)
const auth = (req, res, next) => {
  req.user = false;
  next();
};

// dummy function to check authentication (irl: e.g. passport-jwt)
const checkAuth = (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user)=>{
    if(err || !user){
      throw new Error('Not authenticated');
    }
  })(req, res)
};

// app.post(auth);

app.use('/auth', authRoute);
app.use('/user', userRoute);

app.use(
    '/graphql',
    (req, res) => {
      graphqlHTTP({
        schema: MyGraphQLSchema,
        graphiql: true,
        context: {req, res, checkAuth},
      })(req, res);
    });

app.listen(3000);
