// REQUIRE our dependencies

var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

// set up our port to be either the host , or 3000
var PORT = process.env.PORT || 3000;
// initialize our express server
var app = express();
// set up an expres router
var router = express.Router();

// requires our routes file and passes our router object

require("./config/routes")(router);
// enable reading of public files, css
app.use(express.static(__dirname + "/public"));

// connect handlebars to our express app

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// use bodyparser in our app

app.use(
  bodyparser.urlencoded({
    extended: false
  })
);

// ** have every request go through our router middleware
app.use(router);

// if deployed, use the deployed database, otherwise use the local mongoheadlines db
// var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// connect mongoose to our database
// mongoose.connect(db, function(error) {
mongoose.connect(MONGODB_URI, function(error) {
  // log any errors connecting to mongoose
  if (error) {
    console.log(error);
  } else {
    console.log("mongoose connection SUCCESS!");
  }
});

// listen on the port and generate msg to client
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});
