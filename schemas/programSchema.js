const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const { Schema } = mongoose;

const programSchema = new Schema(
  {
    programNumber: String,
    programName: String,
    programInfo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Track",
        autopopulate: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

programSchema.plugin(autopopulate);

module.exports = programSchema;
