const mongoose = require("mongoose");
const programSchema = require("../schemas/programSchema");

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
