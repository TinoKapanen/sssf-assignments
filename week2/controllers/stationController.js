'use strict';
const stationModel = require('../models/station');
const connectionModel = require('../models/connection');
const rectangleBounds = require('../utils/rectangleBounds');

const station_list_get = async (req, res) => {
  try {
    const topRight = req.query.topRight;
    const bottomLeft = req.query.bottomLeft;
    let start = 0;
    if (req.query.start) start = +req.query.start;
    let limit = 10;
    if (req.query.limit) limit = +req.query.limit;
    // test with location:
    // http://localhost:3000/station?topRight={"lat":60.2821946,"lng":25.036108}&bottomLeft={"lat":60.1552076,"lng":24.7816538}
    // test with limits:
    // http://localhost:3000/station?start=10&limit=4
    let stations = [];

    if (topRight && bottomLeft) {
      const mapBounds = rectangleBounds(JSON.parse(topRight),
          JSON.parse(bottomLeft));
      stations = await stationModel.find({
        Location: {
          $geoWithin: {  // geoWithin is built in mongoose, https://mongoosejs.com/docs/geojson.html
            $geometry: mapBounds,
          },
        },
      }).populate({
        path: 'Connections',
        populate: [
          {path: 'ConnectionTypeID'},
          {path: 'CurrentTypeID'},
          {path: 'LevelID'},
        ],
      });
    } else {
      stations = await stationModel.find().skip(start).limit(limit).populate({
        path: 'Connections',
        populate: [
          {path: 'ConnectionTypeID'},
          {path: 'CurrentTypeID'},
          {path: 'LevelID'},
        ],
      });
    }
    console.log(stations.length);
    res.json(stations);
  }
  catch (e) {
    res.status(500).json({message: e.message});
  }
};

const station_get = async (req, res) => {
  try {
    const stations = await stationModel.findById(req.params.id).populate({
      path: 'Connections',
      populate: [
        {path: 'ConnectionTypeID'},
        {path: 'CurrentTypeID'},
        {path: 'LevelID'},
      ],
    });
    res.json(stations);
  }
  catch (e) {
    res.status(500).json({message: e.message});
  }
};

const station_post = async (req, res) => {
  try {
    console.log('station_post', req.body);
    const connections = req.body.Connections;
    const newConnections = await Promise.all(connections.map(async conn => {
      let newConnection = new connectionModel(conn);
      const result = await newConnection.save();
      return result._id;
    }));
    console.log('nc', newConnections);

    const station = req.body.Station;
    station.Connections = newConnections;
    station.Location.type = 'Point';

    console.log('st', station);
    const newStation = new stationModel(station);
    console.log('ns', newStation);
    const rslt = await newStation.save();
    console.log(rslt);
    res.status(200).json(rslt);
  }
  catch (e) {
    res.status(500).json({message: e.message});
  }
};

const station_put = async (req, res) => {
  console.log('station_put', req.body);
  try {
    const conns = await Promise.all(req.body.Connections.map(async conn => {
      const result = await connectionModel.findByIdAndUpdate(conn._id, conn,
          {new: true});
      return result;
    }));

    const rslt = await stationModel.findByIdAndUpdate(req.body.Station._id, // you can also get id in json
        req.body.Station,
        {new: true});
    res.json(rslt);
  }
  catch (e) {
    res.status(500);
  }
};

const station_delete = async (req, res) => {
  try {
    // delete connections
    const stat = await stationModel.findById(req.params.id); // you can also get id as parameter
    const delResult = await Promise.all(
        stat.Connections.map(async (conn) => {
          return await connectionModel.findByIdAndDelete(conn._id);
        }));
    console.log('delete result', delResult);
    // delete station
    const rslt = await stationModel.findByIdAndDelete(req.params.id);
    res.json({message: 'station deleted', _id: rslt._id});
  }
  catch (e) {
    res.status(500).json({message: e.message});
  }
};

module.exports = {
  station_list_get,
  station_get,
  station_post,
  station_put,
  station_delete,
};
