//assigning dependencies
var express = require ("express");
var app = express();
var PORT = process.env.PORT || 8080;

//setting up express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//requiring the route files. 
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

//starting the server
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});