var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
var campgrounds = [
  {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8358/8444469474_8f4b935818.jpg"},
  {name: "Granite Hill", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"}
];


app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", { campgrounds: campgrounds});
});

// route per creazione campeggio
app.post("/campgrounds", function(req, res){
  // recupero i dati dalla form e aggiungerli ad array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  // redirezione alla pagina con elenco campgrounds
  res.redirect("/campgrounds");
});

// route per form inserimento nuovo elemento
app.get("/campgrounds/new", function(req, res) {
   res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The YelpCamp Server Has Started!");
});