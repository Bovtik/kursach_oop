var ShortWay = new Object();

ShortWay.findEdge = function(graph, from, to) {
	if (from == to)
		return {source: from, target: to, to: 0, from: 0};

	var edge = false;

	graph.edges.forEach( function(item, i, arr) {
		if (item.source == to && item.target == from)				
			edge = Object.create(item);

		if (item.source == from && item.target == to) {
			edge = Object.create(item);
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

	edges.forEach(function (item, i, arr) {
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

ShortWay.findShortWay = function (graph, cpArr) {
	cpArr.forEach(function(item, i, arr) {
		graph.nodes[item].color = '#4444ff';
	});
	var floydM = this.floyd(graph);
	var data = {
		graph: graph,
		cpArr: cpArr,
		way: [],
		waylength: 0
	};
	
	cpArr.forEach(function(item, i, arr) {
		if (i + 1 >= cpArr.length) {
			return;
		}

		var next = arr[i + 1],
				tempWay = [];
		var tmp = floydM.h[next][item];

		data.waylength += floydM.w[0][item];

		console.log(item + ' -> ' + next);

		while (true) {
			console.log('tmp = ' + tmp);
			tempWay.push(tmp);
			if (tmp == floydM.h[tmp][item]) {
				console.log('hit >> ' + tmp);
				tempWay.push(tmp);
				break;
			}
			tmp = floydM.h[tmp][item];			
		}

		tempWay.reverse();
		console.log(tempWay);
		tempWay.forEach(function (item) {data.way.push(item)});
		
		data.way.push(arr[i + 1]);
		for (var j = 0; j < data.way.length; j++) {
			if (data.way[j] == data.way[j + 1]) {
				delete data.way[j];
				data.way.splice(j, 1);
				--j;
			}
		}

	});

	return data;
}

ShortWay.optimize = function (way) {
	for (var i = way.length - 1; i >= 0; i--) {
		way.forEach(function(item, j) {
			if (item === way[i] && i !== j) {
				delete way[i];
				way.splice(i, 1);
				return;
			}
		})
	}
}

module.exports = ShortWay;