const mongoose = require("mongoose");
const marketSchema = require("../../schemas/dropdowns/marketSchema");


const Market = mongoose.model("Market", marketSchema);

module.exports = Market;
