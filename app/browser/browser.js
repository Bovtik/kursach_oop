
var nodeAmount;
var s;
socket.on('connect', function (socket) {});

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

socket.on('cpArr', function (cpArr) {
	var nodeList = document.querySelector('.nodelist');
	nodeList.innerHTML = '';

	cpArr.forEach(function(item, i) {
		nodeList.innerHTML += item;
		if (i+1 < cpArr.length)
			nodeList.innerHTML += ', ';
	});
});

socket.on('result', function(result) {
	var wayInfo = document.querySelector('.way');
	wayInfo.innerHTML = '';
	result.way.forEach(function(item, i) {
		wayInfo.innerHTML += item;
		if (i+1 < result.way.length)
			wayInfo.innerHTML += ' > ';
	});

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
});

document.getElementById('genBtn').addEventListener('click', function (e) {
	var amount = document.getElementById('genAmount').value;

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

document.getElementById('dirBtn').addEventListener('click', function (e) {
	var _str_cpArr = document.getElementById('directSel').value;

	var cpArr = _str_cpArr.replace(/\s/g, "").split(',');

	for (var i in cpArr) {
		cpArr[i] = Number(cpArr[i]);
	}

	console.log(cpArr);
	socket.emit('direct select', cpArr);
});

document.getElementById('launchBtn').addEventListener('click', function (e) {
	socket.emit('launch');
});

//sigma.parsers.json('components/graph.json', {});