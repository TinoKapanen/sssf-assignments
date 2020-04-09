'use strict';
// currentTypeRoute
const express = require('express');
const router = express.Router();
const currentTypeController = require('../controllers/currentTypeController');

router.get('/', currentTypeController.currentType_list_get);

router.get('/:id', currentTypeController.currentType_get);

router.post('/', (req, res) => {
  res.send('With this endpoint you can add currentTypes');
});

router.put('/', (req, res) => {
  res.send('With this endpoint you can edit currentTypes');
});

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete currentTypes');
});

module.exports = router;
