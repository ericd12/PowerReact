const mongoose = require("mongoose");
const elementSchema = require("../schemas/elementSchema");

const Element = mongoose.model("Element", elementSchema);

module.exports = Element;
