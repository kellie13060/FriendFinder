//assigning dependencies
var express = require("express");
var path = require("path");

//setting up express
var app = express();
var PORT = process.env.PORT || 8080;

//setting up express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//requiring the route files. 
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//starting the server
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});