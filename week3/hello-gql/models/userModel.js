const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  full_name: String,
});

module.exports = mongoose.model('User', userSchema);

