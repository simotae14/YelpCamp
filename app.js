var express = require("express");
var app = express();

app.get("/", function(req, res){
  res.send("Questa sarà presto la landing page");
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The YelpCamp Server Has Started!");
});