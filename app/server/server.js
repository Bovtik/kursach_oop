var http = require('http'),
		fs = require('fs'),
 		path = require('path');

var express = require('express');
var app = express();


var App = require('../components/app.js'),
		ShortWay = require('../components/shortway.js');

//App.constructGraph('app/components/', 'graph');

app.use('/browser', 
  express.static(
    path.join(
      path.join(__dirname, '..'), 'browser')));

app.use('/components', 
  express.static(
    path.join(
      path.join(__dirname, '..'), 'components')));

app.get('/', function (req, res) {
  var layout = fs.readFileSync('app/browser/index.html', 'utf8');
  res.send(layout);
});

var server = app.listen(1337, function () {
  console.log('Listening on port 1337');
});

var io = require('socket.io').listen(server);

io.on ('connection', function (socket) {
	console.log('welcome');	

	var graph = App.loadGraph('app/components/graph.json');
	
	socket.emit('init', graph);

	socket.on('generate', function(amount) {
		var cpArr = App.generateControlPoints(amount, graph.nodes.length);
		console.log(cpArr);
		if (result) delete result
		var result = ShortWay.findShortWay(graph, cpArr);
		socket.emit('result', result);
	});

	socket.on ('disconnect', function () {
		console.log('goodbye');
	});
});

