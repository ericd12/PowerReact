const { Schema } = require("mongoose");

const elementSchema = new Schema(
  {
    elementNumber: { type: String, required: true },
    elementLabel: { type: String, required: true },
    elementDescription: { type: String, required: true },
    elementFormat: {
      type: Schema.Types.ObjectId,
      ref: "Format",
    },
    elementDuration: { type: String, required: true },
    elementCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    elementSubCategory: { type: String, required: true },
    elementMarket: { type: Schema.Types.ObjectId, ref: "Market" },
    elementCogRating: { type: Number, required: true },
    elementPhysRating: { type: Number, required: true },
    elementLink: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = elementSchema;
