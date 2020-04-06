'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./database/db');
const stationRoute = require('./routes/stationRoute');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/station', stationRoute);

db.on('connected', () => {
  app.listen(3000);
});
