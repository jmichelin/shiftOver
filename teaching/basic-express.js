//hrse1
var express = require('express');
var http = require('http');
var open = require('open');

var app = express();

app.use(express.static('./public'));

app.get('/', function (req, res) {
  res.sendFile('./public/index.html');
});

http.createServer(app).listen(1337);
console.log('Express server is listening on port 1337');
open('http://localhost:1337');