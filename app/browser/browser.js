
var nodeAmount;
var s;
socket.on('connect', function (socket) {

});

socket.on('init', function(graph) {
	nodeAmount = graph.nodes.length;
	s = new sigma({
		graph: graph,
		container: 'canvas',
		settings: {
	  	defaultNodeColor: '#ec5148',
	  	defaultEdgeColor: '#ec5148',
	  	edgeColor: 'default'
	  }
	});
});

socket.on('result', function(result) {
	s.graph = result.graph;

	for(var key in s.graph.nodes()) {
		s.graph.nodes()[key].color = '#ec5148';
	}

	for (var i = 0; i < result.cpArr.length; i++) {
		s.graph.nodes().forEach(function (item) {

			if (item.label == result.cpArr[i])
				item.color = "#33aa33"
		});
	}

	for(var key in s.graph.edges()) {
		s.graph.edges()[key].color = '#ec5148';
	}

	for (var i = 0; i < result.way.length - 1; i++) {
		s.graph.edges().forEach(function (item) {
			
			if (item.source == 'n' + result.way[i] && item.target == 'n' + result.way[i + 1] ||
					item.target == 'n' + result.way[i] && item.source == 'n' + result.way[i + 1])
				item.color = '#3333ff';
		});
	}

	s.refresh();
	console.log(result.cpArr);
	console.log(result.way);
});

document.getElementById('genBtn').addEventListener('click', function (e) {
	var amount = document.getElementById('amount').value;

	if (!amount.match(/^\d+$/)) {
		alert('Incorrect input');
		return;
	}

	amount = +amount;

	if (amount > nodeAmount) {
		alert('Excessive amount');
		return;
	}

	socket.emit('generate', amount);
});



//sigma.parsers.json('components/graph.json', {});