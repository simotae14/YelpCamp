var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
    
// CONNETTO IL DB
mongoose.connect('mongodb://localhost/yelp_camp');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// SETUP DELLO SCHEMA
var campeggioSchema = new mongoose.Schema({
  nome: String,
  immagine: String,
  descrizione: String
});

var Campground = mongoose.model('Campground', campeggioSchema);

// Creo un'istanza di Campeggio
// Campground.create(
//   {
//     nome: "Granite Hill", 
//     immagine: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
//     descrizione: 'E\' una maestosa collina di granito, senza bagni. Senza acqua. Bellissimo granito.'
//   }, function(err, campeggio) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log('CAMPEGGIO APPENA CREATO: ');
//       console.log(campeggio);
//     }
//   });


// ROUTES
app.get('/', function(req, res) {
  res.render('landing');
});

// INDEX: Mostra tutti i campeggi
app.get('/campeggi', function(req, res){
  // RECUPERO TUTTI I CAMPEGGI DA DB
  Campground.find({}, function(err, campeggi){
    if(err) {
      console.log(err);
    } else {
      res.render('index', {campeggi: campeggi});
    }
  });
});

// CREATE: Aggiunge un nuovo campeggio al DB
app.post('/campeggi', function(req, res){
  // recupero i dati dalla form e li inserisco nell'array campeggi
  var nome = req.body.nome;
  var immagine = req.body.immagine;
  var descrizione = req.body.descrizione;
  var nuovoCampeggio = { nome: nome, immagine: immagine, descrizione: descrizione };
  
  // CREO UN NUOVO campeggio e lo salvo a DB
  Campground.create(nuovoCampeggio, function(err, appenaCreato){
    if(err) {
      console.log(err);
    } else {
      // redireziono alla pagina campeggi
      res.redirect('/campeggi');
    }
  });
});

// NEW: Mostra la form per creare un nuovo campeggio
app.get('/campeggi/new', function(req, res) {
  res.render('new');
});

// SHOW: Mostra il dettaglio di un campeggio
app.get('/campeggi/:id', function(req, res) {
  // trova il campeggio con l'ID fornito
  var campId = req.params.id;
  Campground.findById(campId, function(err, campeggioTrovato){
    if(err) {
      console.log(err);
    } else {
      // renderizza il template show del dato campeggio
      res.render('show', {campeggio: campeggioTrovato });
    }
  });

});

// SERVER
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Il Server YelpCamp è stato eseguito!");
});