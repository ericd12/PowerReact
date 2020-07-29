const mongoose = require("mongoose");
const trackSchema = require("../schemas/trackSchema");

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
