var http = require('http'),
		fs = require('fs'),
 		path = require('path');

var express = require('express');
var app = express();


var App = require('../components/app.js'),
		ShortWay = require('../components/shortway.js');

var store = {};

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
	var graph = App.loadGraph('app/components/graph.json');
	
	socket.emit('init', graph);

	socket.on('generate', function(amount) {
		var cpArr = App.generateControlPoints(amount, graph.nodes.length);
		store.cpArr = cpArr;
		console.log('Control nodes: ', store.cpArr);
		socket.emit('cpArr', cpArr);	
	});

	socket.on('direct select', function (cpArr) {
		store.cpArr = cpArr;
		console.log('Control nodes: ', store.cpArr);
		socket.emit('cpArr', cpArr);	
	});

	socket.on('launch', function () {
		var result = ShortWay.findShortWay(graph, store.cpArr);
		ShortWay.optimize(result.way);
		socket.emit('result', result);
	})

	socket.on ('disconnect', function () {
		console.log('disconnected');
	});
});

