'use strict';
// connectionRoute
const express = require('express');
const router = express.Router();
const passport = require('../utils/pass');
const connectionController = require('../controllers/connectionController');

router.get('/', connectionController.connection_list_get);

router.get('/:id', connectionController.connection_get);

router.post('/', (req, res) => {
  res.send('With this endpoint you can add connections');
});

router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send('With this endpoint you can edit a connection');
});

router.delete('/:id', (req, res) => {
  res.send('With this endpoint you can delete a connection');
});

module.exports = router;
