const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  elementCategory: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = categorySchema;
