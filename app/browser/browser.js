var socket = io('http://127.0.0.1:1338');



socket.on('connect', function (socket) {

});

socket.on('init', function(graph) {
	var s = new sigma({
		graph: graph,
		container: 'canvas',
		settings: {
	  	defaultNodeColor: '#ec5148'
	  }
	});
});


document.getElementById('genBtn').addEventListener('click', function (e) {
	var amount = document.getElementById('amount').value;
	if (!amount.match(/^\d+$/)) {
		alert('Incorrect input');
		return;
	}
	amount = +amount;
	socket.emit('generate', amount);
});



//sigma.parsers.json('components/graph.json', {});