'use strict';
const levelModel = require('../models/level');

const level_list_get = async (req, res) => {
  try {
    const levels = await levelModel.find();
    res.json(levels);
  }
  catch (e) {
    res.status(500).json({message: e.message});
  }

};

const level_get = async (req, res) => {
  try {
    const stations = await levelModel.findById(req.params.id);
    res.json(stations);
  }
  catch (e) {
    res.status(500).json({message: e.message});
  }
};

const level_post = (req, res) => {
  console.log('level_post', req.body);
  res.send('With this endpoint you can add levels');
};

module.exports = {
  level_list_get,
  level_get,
  level_post,
};
