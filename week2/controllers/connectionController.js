'use strict';
const connectionModel = require('../models/connection');

const connection_list_get = async (req, res) => {
  try {
  const connections = await connectionModel.findById(req.params.id);
  res.json(connections);
  } catch (e) {
    console.error('connection_list_get', e);
    res.status(500).json({message: e.message});
  }
};

const connection_get = async (req, res) => {
  res.send('With this endpoint you can get one connections');
};

const connection_post = (req, res) => {
  res.send('With this endpoint you can add connections');
};

module.exports = {
  connection_list_get,
  connection_get,
  connection_post,
};
