'use strict';
require('dotenv').config();

const express = require('express');
const db = require('./models/db');
const cat = require('./models/cats');
const user = require('./models/users');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  console.log('someone visit my url ☺');
  res.send(await cat.find().populate('owner'));
});

app.post('/cats', async(req, res) => {
  const mycat = await cat.create({ name: 'garfield', age: 7, owner: '5e7b0ae1f304f22815649e05' });
  res.send(`cat created with id: ${mycat._id}`);
});

app.post('/users', async (req, res) => {
  const myuser = await user.create({ name: 'Mary', email: 'm@met.fi', password: 'abc' });
  res.send(`user created with id ${myuser._id}`);
});

app.get('/test', (req, res) => {
  console.log('test url', req);
  const cat = {
    name: 'Garfield',
    age: 15,
    weight: 25
  };
  res.json(cat);
});

db.on('connected', () => {
  app.listen(port, () => console.log(`app listening on port ${port}!`));
});
