const mongoose = require("mongoose");
const formatSchema = require("../../schemas/dropdowns/formatSchema");

const Format = mongoose.model("Format", formatSchema);

module.exports = Format;
