const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  //TODO: schema
  Title: String,
  AddressLine1: String,
  Town: String,
  StateOrProvience: String,
  Postcode: String,
  Connections: [{type: Schema.Types.ObjectId, ref: 'Connection'}],
  Location: {
    type: {
      type: String,
      enum: ['poing'],
      required: true,
    },
    coordinates: {
      type: [Number], 
      required: true,
    }
  }
});

module.exports = mongoose.model('Station', stationSchema);
