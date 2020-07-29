const mongoose = require("mongoose");

const { Schema } = mongoose;

const formatSchema = new Schema({
  elementFormat: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = formatSchema