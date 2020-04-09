'use strict';
const connectionTypeModel = require('../models/connectionType');

const connectionType_list_get = async (req, res) => {
  try {
    const connectionTypes = await connectionTypeModel.find();
    res.json(connectionTypes);
  }
  catch (e) {
    res.status(500).json({message: e.message});
  }
};

const connectionType_get = async (req, res) => {
  try {
    const stations = await connectionTypeModel.findById(req.params.id);
    res.json(stations);
  }
  catch (e) {
    res.status(500).json({message: e.message});
  }
};

const connectionType_post = (req, res) => {
  console.log('connectionType_post', req.body);
  res.send('With this endpoint you can add connectionTypes');
};

module.exports = {
  connectionType_list_get,
  connectionType_get,
  connectionType_post,
};
