var express = require('express')
var app = express();
var mongoose = require('mongoose')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var port = 3002;
var path = require('path');

mongoose.connect('mongodb://localhost/plan_a_day', function(err) {
  if (err) return console.log(err)
  console.log('connected to mongo shell');
})

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})


app.listen(port, function(err) {
  if (err) return console.log(err)
  console.log('connected to server at port: ' + port);
})