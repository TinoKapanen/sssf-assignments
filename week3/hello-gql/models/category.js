const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cateorySchema = new Schema(
    {
      categoryName: String,
    },
);

module.exports = mongoose.model('Category', cateorySchema);
