var fs = require('fs');

var App = new Object();

App.sampleEgdes = [];
App.sampleEgdes[0] = [
	{
		id: 'e0',
		source: 'n0',
		target: 'n1'
	},
	{
		id: 'e1',
		source: 'n0',
		target: 'n4'
	},
	{
		id: 'e2',
		source: 'n0',
		target: 'n8'
	},
	{
		id: 'e3',
		source: 'n1',
		target: 'n6'
	},
	{
		id: 'e4',
		source: 'n4',
		target: 'n2'
	},
	{
		id: 'e5',
		source: 'n8',
		target: 'n12'
	},
	{
		id: 'e6',
		source: 'n2',
		target: 'n3'
	},
	{
		id: 'e7',
		source: 'n4',
		target: 'n5'
	},
	{
		id: 'e8',
		source: 'n5',
		target: 'n9'
	},
	{
		id: 'e9',
		source: 'n9',
		target: 'n13'
	},
	{
		id: 'e10',
		source: 'n3',
		target: 'n6'
	},
	{
		id: 'e11',
		source: 'n5',
		target: 'n10'
	},
	{
		id: 'e12',
		source: 'n12',
		target: 'n10'
	},
	{
		id: 'e13',
		source: 'n13',
		target: 'n11'
	},
	{
		id: 'e14',
		source: 'n14',
		target: 'n15'
	},
	{
		id: 'e15',
		source: 'n7',
		target: 'n15'
	},
	{
		id: 'e16',
		source: 'n3',
		target: 'n11'
	},
	{
		id: 'e17',
		source: 'n6',
		target: 'n10'
	},
	{
		id: 'e18',
		source: 'n11',
		target: 'n14'
	},
	{
		id: 'e19',
		source: 'n3',
		target: 'n7'
	},
	{
		id: 'e20',
		source: 'n8',
		target: 'n9'
	}
];

App.constructGraph = function (path, fileName, nodeAmount) {
	var nodeAmount = nodeAmount || 16,
			fileName = fileName || 'graph',
			path = path || './';
			fileName += '.json';

	var graph = {
		nodes: [],
		edges: []
	};

	for (var i = 0; i < nodeAmount; i++) {
		var node = {
			x: (2 * i + Math.floor(i / 4) % 2) % 8,
			y: Math.floor(i / 4) * 2,
			id: 'n' + i,
			label: '' + i,
			size: 1
		};

		graph.nodes.push(node);
	}

	this.sampleEgdes[0].forEach(function (item, i, arr) {
		var edge = item;
		edge.from = Math.floor( Math.random() * 40 ) + 10;
		edge.to = Math.floor( Math.random() * 40 ) + 10;
		edge.label = edge.to + ' / ' + edge.from;
		graph.edges.push(edge);
	});
	if (typeof fs !== 'undefined' && fs !== null)
		fs.writeFileSync(path + fileName, JSON.stringify(graph), 'utf8');

	return fileName;
};

App.generateControlPoints = function (amount, max) {
	var cpArr = [];
	for (var i = 0; i < amount; i++) {
		var tmpNum = Math.floor(Math.random() * max);
		for (var i = 0; i < cpArr.length; i++) {
			if (tmpNum === cpArr[i]) {
				tmpNum = Math.floor(Math.random() * max);
				--i;
			}
		}
		cpArr.push(tmpNum);
	}
	
	//cpArr = [9, 0, 1, 3, 7];
	//	3, 1, 8, 0, 6

	return cpArr;
};

App.loadGraph = function (path) {
	var stringData = fs.readFileSync(path);
	var graph = JSON.parse(stringData);
	return graph;
}

module.exports = App;


