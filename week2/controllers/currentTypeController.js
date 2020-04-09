'use strict';
const currentTypeModel = require('../models/currentType');

const currentType_list_get = async (req, res) => {
  try {
    const currentTypes = await currentTypeModel.find();
    res.json(currentTypes);
  }
  catch (e) {
    res.status(500).json({message: e.message});
  }

};

const currentType_get = async (req, res) => {
  try {
    const stations = await currentTypeModel.findById(req.params.id);
    res.json(stations);
  }
  catch (e) {
    res.status(500).json({message: e.message});
  }
};

const currentType_post = (req, res) => {
  console.log('currentType_post', req.body);
  res.send('With this endpoint you can add currentTypes');
};

module.exports = {
  currentType_list_get,
  currentType_get,
  currentType_post,
};
