const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");
const { Schema } = mongoose;

const trackSchema = new Schema({
  trackNumber: String,
  trackName: String,
  trackInfo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Element",
      autopopulate: true,
    },
  ],
});

trackSchema.plugin(autopopulate);

module.exports = trackSchema;
