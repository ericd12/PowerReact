const mongoose = require("mongoose");
const categorySchema = require("../../schemas/dropdowns/categorySchema");


const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
