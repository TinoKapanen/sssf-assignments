'use strict';
// levelRoute
const express = require('express');
const router = express.Router();
const levelController = require('../controllers/levelController');

router.get('/', levelController.level_list_get);

router.get('/:id', levelController.level_get);

router.post('/', (req, res) => {
  res.send('With this endpoint you can add levels');
});

router.put('/', (req, res) => {
  res.send('With this endpoint you can edit levels');
});

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete levels');
});

module.exports = router;
