'use strict';
const connectionModel = require('../models/connection');

const connection_list_get = async (req, res) => {
  try {
    const connections = await connectionModel.find();
    res.json(connections);
  }
  catch (e) {
    res.status(500).json({message: e.message});
  }

};

const connection_get = async (req, res) => {
  try {
    const stations = await connectionModel.findById(req.params.id);
    res.json(stations);
  }
  catch (e) {
    res.status(500).json({message: e.message});
  }
};

const connection_post = (req, res) => {
  console.log('connection_post', req.body);
  res.send('With this endpoint you can add connections');
};

module.exports = {
  connection_list_get,
  connection_get,
  connection_post,
};
