var http = require('http'),
		fs = require('fs'),
 		path = require('path');

var express = require('express');
var server = express();
var ws = require('socket.io')(1338);

var App = require('../components/app.js'),
		ShortWay = require('../components/shortway.js');

//App.constructGraph('app/components/', 'graph');

server.use('/browser', 
  express.static(
    path.join(
      path.join(__dirname, '..'), 'browser')));

server.use('/components', 
  express.static(
    path.join(
      path.join(__dirname, '..'), 'components')));

server.get('/', function (req, res) {
  var layout = fs.readFileSync('app/browser/index.html', 'utf8');
  res.send(layout);
});

server.listen(1337, function () {
  console.log('Listening on port 1337');
});

ws.on ('connection', function (socket) {
	console.log('welcome');	

	var graph = App.loadGraph('app/components/graph.json');
	
	socket.emit('init', graph);

	socket.on('generate', function(amount) {
		console.log(amount);
	});

	socket.on ('disconnect', function () {
		console.log('goodbye');
	});
});

