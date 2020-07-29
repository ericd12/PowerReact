"use strict";

var express = require("express");

var cors = require("cors");

var mongoose = require("mongoose");

var path = require("path");

var bodyParser = require('body-parser');

var apisRouter = require('./routes/apis'); // const elementsRouter = require("./routes/elements");
// const tracksRouter = require("./routes/tracks");
// const programsRouter = require("./routes/programs");
// const formatsRouter = require("./routes/formats");
// const catsRouter = require("./routes/category");
// const marketsRouter = require("./routes/markets");


require("dotenv").config();

var app = express();
var port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express["static"](path.join(__dirname, "client/build")));
app.get('/-*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
mongoose.connect("mongodb://127.0.0.1:27017/powerreact", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
var connection = mongoose.connection;
connection.once("open", function () {
  console.log("db connection created successfully");
});
app.use("/api", apisRouter); // app.use("/api/tracks", tracksRouter);
// app.use("/api/programs", programsRouter);
// app.use("/api/formats", formatsRouter);
// app.use("/api/categories", catsRouter);
// app.use("/api/markets", marketsRouter);

app.listen(port, function () {
  console.log("Server is running on port: ".concat(port));
});
