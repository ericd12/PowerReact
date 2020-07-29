const mongoose = require("mongoose");

const { Schema } = mongoose;

const marketSchema = new Schema({
  elementMarket: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = marketSchema