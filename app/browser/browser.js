var socket = io('http://127.0.0.1:1338');

sigma.parsers.json('components/graph.json', {
	container: 'canvas',
	settings: {
  	defaultNodeColor: '#ec5148'
  }
});