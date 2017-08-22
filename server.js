// require express and path
const express = require("express");
const path = require("path");
// create the express app
const app = express();
// require express sessions
const session = require("express-session")
// use sessions
// var twitch = angular.module('app', ['angularjs.media.directives']);
app.use(session({
	secret: "secret secret secret secret",
	resave: false,
	saveUninitialized: true
}))
// require bodyParser since we need to handle post data for adding a user, set it to use json
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// set angular folder as static content
app.use(express.static(path.join(__dirname, '/public/dist')));
// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');
// store the function in a variable
const routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app);
// tell the express app to listen on port 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})
