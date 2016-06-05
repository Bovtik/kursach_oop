var http = require('http'),
		fs = require('fs'),
 		path = require('path');

var express = require('express');
var server = express();
var ws = require('socket.io')(1338);
var app = require('../components/app.js');

app.constructGraph('app/components/', 'graph');

server.use('/browser', 
  express.static(
    path.join(
      path.join(__dirname, '..'), 'browser')));

server.use('/components', 
  express.static(
    path.join(
      path.join(__dirname, '..'), 'components')));

server.get('/', function(req, res) {
  var layout = fs.readFileSync('app/browser/index.html', 'utf8');
  res.send(layout);
});

server.listen(1337, function () {
  console.log('Listening on port 1337');
});

ws.on ('connection', function (socket) {
	console.log('welcome');	

	socket.on ('disconnect', function (socket) {
		console.log('goodbye');
	});
});

