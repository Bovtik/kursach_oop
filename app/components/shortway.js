var ShortWay = new Object();

ShortWay.findEdge = function(graph, from, to) {
	if (from == to)
		return {source: from, target: to, to: 0, from: 0};

	var edge = false;

	graph.edges.forEach( function(item, i, arr) {
		if (item.source == from && item.target == to)				
			edge = item;

		if (item.source == to && item.target == from) {
			edge = item;
			var tmp = edge;
			edge.source = tmp.target;
			edge.target = tmp.source;
		}
	});
	if (edge)
		return edge;
	else
		return {to: Infinity, from: Infinity};
};

ShortWay.wayLength = function (egdes) {
	var length = 0;

	edges.forEach( function (item, i, arr) {
		length += item.to;
	});

	return length;
}

ShortWay.floyd = function(graph) {
	var matrix = {w: [], h: []};	//	w - weight, h - history
	for (var i = 0; i < graph.nodes.length; i++) {
		matrix.w.push([]);
		matrix.h.push([]);
		for (var j = 0; j < graph.nodes.length; j++) {
			matrix.w[i][j] = this.findEdge(graph, graph.nodes[i].id, graph.nodes[j].id).to;
			matrix.h[i][j] = j;
		}
	}

	for (var k = 0; k < graph.nodes.length; k++)
		for (var i = 0; i < graph.nodes.length; i++)
			for (var j = 0; j < graph.nodes.length; j++)
				if (matrix.w[i][j] > matrix.w[i][k] + matrix.w[k][j]) {
					matrix.w[i][j] = matrix.w[i][k] + matrix.w[k][j];
					matrix.h[i][j] = k;
				}

	return matrix;
};

module.exports = ShortWay;