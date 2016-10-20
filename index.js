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
	for (var i = 0; i < lines.length; i++) {
		var points = lines[i];
		var empties = [];
		var count = 0;
		for (var p = 0; p < points.length; p++) {
			var position = getPosition(p.x, p.y);
			if (position === null) {
				empties.push(p);
			} else if (getPosition(p.x, p.y) == playername) {
				count++;
			}
		}

		if (count == 2) {
			callback(empties[0]);
			played = true;
		}
	}

	if (!played) {

	}

	load.text = 'Doing silly random move thing';
    var x, y;
    var position = 'something'
    while(position !== null) {
      x = Math.floor(Math.random() * 3);
      y = Math.floor(Math.random() * 3);
      position = board[y][x]
    }
    callback({x: x, y: y})
}

icacto.generateMove = move;

icacto.connect(host, undefined, function(err, user) {
  icacto.run();
})
