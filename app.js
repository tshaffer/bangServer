var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require("fs");

// var dbController = require('./controllers/mongoController');
// dbController.initialize();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.send('<html><head></head><body><h1>Hello shafferoto!</h1></body></html>');
});

app.get('/getPhotos', function(req, res) {

  console.log("getPhotos invoked");
  res.set('Access-Control-Allow-Origin', '*');

  var fetchAllPhotosPromise = dbController.fetchAllPhotos();
  fetchAllPhotosPromise.then(function(allPhotos) {
    var response = {};
    response.photos = allPhotos;
    res.send(response);
  });
});

// app.use('/photos', express.static(path.join(__dirname,'/public')));
// app.use('/index.html', express.static(path.join(__dirname,'../bangaract/index.html')));
// app.use(express.static('../bangaract/'));

console.log("__dirname=" + __dirname);
console.log("path.join()=" + path.join(__dirname,'/bangaract'));

app.use('/photos', express.static(path.join(__dirname,'/public')));
app.use('/index.html', express.static(path.join(__dirname,'/index.html')));
app.use('/css/app.css', express.static(path.join(__dirname,'/css/app.css')));
app.use('/bundle.js', express.static(path.join(__dirname, 'bundle.js')));
app.use('/jquery.min.js', express.static(path.join(__dirname, 'jquery.min.js')));

app.use(express.static(path.join(__dirname,'/bangaract/')));

var port = process.env.PORT || 3000;
app.listen(port);

