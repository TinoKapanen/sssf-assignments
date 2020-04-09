'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./database/db');
const stationRoute = require('./routes/stationRoute');
const connectionRoute = require('./routes/connectionRoute');
const connectionTypeRoute = require('./routes/connectionTypeRoute');
const currentTypeRoute = require('./routes/currentTypeRoute');
const levelRoute = require('./routes/levelRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/station', stationRoute);
app.use('/connection', connectionRoute);
app.use('/connectiontype', connectionTypeRoute);
app.use('/currenttype', currentTypeRoute);
app.use('/level', levelRoute);

db.on('connected', () => {
  app.listen(3000);
});
