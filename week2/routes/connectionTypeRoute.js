'use strict';
// connectionTypeRoute
const express = require('express');
const router = express.Router();
const connectionTypeController = require('../controllers/connectionTypeController');

router.get('/', connectionTypeController.connectionType_list_get);

router.get('/:id', connectionTypeController.connectionType_get);

router.post('/', (req, res) => {
  res.send('With this endpoint you can add connectionTypes');
});

router.put('/', (req, res) => {
  res.send('With this endpoint you can edit connectionTypes');
});

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete connectionTypes');
});

module.exports = router;
