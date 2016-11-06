var express = require('express')
  , load = require('express-load'),
    bodyParser = require('body-parser');
  
var mongoose = require('mongoose');
var app = express();


global.db = mongoose.connect(process.env.MONGODB_URI);


mongoose.connection.on('connected', function(){
  console.log("Mongoose Connected!");
});

mongoose.connection.on('error', function(err){
  console.log("Error when tried connect to db: "+err);
});


// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(express.static(__dirname + '/public'));
  app.use(express.methodOverride());
  app.use(bodyParser.json());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
});

load('models').then('controllers').then('routes').into(app);


app.listen((process.env.PORT || 8080), function(){
  console.log("PresenceWeb Server is Online...");
});
