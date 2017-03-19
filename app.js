var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

// connetto il DB
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

// DEFINISCO IL MODEL
var Campground = mongoose.model("Campground", campgroundSchema);

// CREO un'istanza di campground
// Campground.create({
//   name: "Granite Hill", 
//   image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"
// }, function(err, campground){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("NEWLY CREATED CAMPGROUND: ");
//     console.log(campground);
//   }
// });


app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  // Recupero tutti i campgrounds da db
  Campground.find({}, function(err, campgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds", { campgrounds: campgrounds});
    }
  });
});

// route per creazione campeggio
app.post("/campgrounds", function(req, res){
  // recupero i dati dalla form e aggiungerli ad array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  // Creaimo un nuovo campground e lo salviamo nel DB
  Campground.create(newCampground, function(err, newCamp){
    if(err){
      console.log(err);
    } else {
      // redirezione alla pagina con elenco campgrounds
      res.redirect("/campgrounds");    
    }
  });
});

// route per form inserimento nuovo elemento
app.get("/campgrounds/new", function(req, res) {
   res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The YelpCamp Server Has Started!");
});