const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const connectionSchema = new Schema({

});

module.exports = mongoose.model('Connection', connectionSchema);
