const host = 'https://icacto.herokuapp.com';
// const host = 'http://localhost:3000';

var icacto = require('./icacto');

var move = function(board, playername, callback) {
	var getPosition = function(x, y) {
		return board[y][x];
	}

	var lines = [
		[{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}],
		[{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
		[{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}],

		[{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
		[{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
		[{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}],

		[{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
		[{x: 0, y: 2}, {x: 1, y: 1}, {x: 2, y: 0}]
	];

	//Look for winning moves.
	var played = false;

	var emptySquares = 0;
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			if (getPosition(x, y) === null) {
				emptySquares++;
			}
		}
	}

	if (emptySquares == 9) {
		played = true;
		callback({x: 1, y: 1});
	}

	if (!played) {
		for (var i = 0; i < lines.length; i++) {
			var points = lines[i];
			var empties = [];
			var count = 0;
			for (var _p = 0; _p < points.length; _p++) {
				var p = points[_p];
				var position = getPosition(p.x, p.y);
				if (position === null) {
					empties.push(p);
				} else if (getPosition(p.x, p.y) == playername) {
					count++;
				}
			}

			if (count == 2 && empties.length > 0) {
				callback(empties[0]);
				played = true;
			}
		}
	}

	//Look for defensive blocks.
	if (!played) {
		for (var i = 0; i < lines.length; i++) {
			var points = lines[i];
			var empties = [];
			var count = 0;
			for (var _p = 0; _p < points.length; _p++) {
				var p = points[_p];
				var position = getPosition(p.x, p.y);
				if (position === null) {
					empties.push(p);
				} else if (getPosition(p.x, p.y) != playername) {
					count++;
				}
			}

			if (count == 2 && empties.length > 0) {
				console.log("playing defensively.");
				callback(empties[0]);
				played = true;
			}
		}
	}

	if (!played) {
		for (var i = 0; i < lines.length; i++) {
			var points = lines[i];
			var empties = [];
			var count = 0;
			for (var _p = 0; _p < points.length; _p++) {
				var p = points[_p];
				var position = getPosition(p.x, p.y);
				if (position === null) {
					empties.push(p);
				} else if (getPosition(p.x, p.y) == playername) {
					count++;
				} else {
					count--;
				}
			}

			if (count > 0 && empties.length > 0) {
				callback(empties[Math.floor(Math.random() * empties.length)]);
				played = true;
			}
		}
	}

	if (!played) {
		console.log("playing random.");
	    var x, y;
	    var position = 'something'
	    while(position !== null) {
	      x = Math.floor(Math.random() * 3);
	      y = Math.floor(Math.random() * 3);
	      position = board[y][x]
	    }
	    callback({x: x, y: y})
	}
}

icacto.generateNextMove = move;

icacto.connect(host, undefined, function(err, user) {
  icacto.run();
})
