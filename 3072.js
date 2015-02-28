$(document).ready(function(){

	var grid = [[0,0,0,0], [0,0,0,0], [0,0,0,0],[0,0,0,0]];
	var score = 0;

	function start_grid(grid) {

			var count = 0;
			var rand = function () {
				return Math.floor(Math.random() * 4);
			};
	
			while (count < 2) {
					var x = rand();
					var y = rand();
					var combo = x + '' + y;
				if (grid[x][y] === 0) {
		 			grid[x][y] = 3;
		 			$('td[id=' + combo + ']').text(3).addClass('three');
		 			$('#score h5').text(0);
		 			count++;
	 			}
			}
			slide(grid);
	}
	start_grid(grid);

function slide(grid){
	var init = [[],[],[],[]];
	var moveLeft = function(codeDirection) {
		for (var i = 0; i < grid.length; i++) {
			for (var j = 0; j < grid.length; j++) {

				if (grid[i][j] > 0) {
					init[i].push(grid[i][j]);
				}			
			}
			while (init[i].length < 4) {
				init[i].push(0);
			}
		}
		merge(init, codeDirection);
	}

	var moveRight = function(codeDirection) {
		for (var i = 0; i < grid.length; i++) {
			for (var j = 0; j < grid.length; j++) {
				
				if (grid[i][j] > 0) {
					init[i].push(grid[i][j]);	
				}			
			}
			while (init[i].length < 4) {
				init[i].unshift(0);
			}
		}
		merge(init, codeDirection);
	}

	var moveUp = function(codeDirection) {
		for (var i = 0; i < grid.length; i++) {
			for (var j = 0; j < grid.length; j++) {
			var previousCellCheck = false;

				if (i === 0) {
					init[i].push(grid[i][j]);
				} else {
					if (init[i-1][j] !== 0) {

						init[i].push(grid[i][j]);

					} else {

						for (var prev = 0; prev < i; prev++) {
							
							if (init[prev][j] === 0 && previousCellCheck === false) {
								init[prev][j] = grid[i][j];
								init[i][j] = 0;
								previousCellCheck = true;
							} 
						}
						
					}
				}
			}
			
		}
		merge(init, codeDirection);
	}
	var moveDown = function(codeDirection) {
		for (var i = grid.length - 1; i > -1; i--) {
			for (var j = 0; j < grid.length; j++) {
				var nextCellCheck = false;

				if (i === 3) {
						init[i].push(grid[i][j]);
				} else {
					if (init[i+1][j] !== 0) {

						init[i].push(grid[i][j]);

					} else {

						for (var nex = grid.length - 1; nex > i; nex--) {
							if (init[nex][j] === 0 && nextCellCheck === false) {
								init[nex][j] = grid[i][j];
								init[i][j]= 0;
								nextCellCheck = true;
							}
						}
					} 
				}
			}
		}
		merge(init, codeDirection);
	}

	if (Modernizr.touch === false) {
		$(window).off('keyup');
	 	$(window).on('keyup', function(event){
	 		var code = event.keyCode;
			if (code === 37) { 
				moveLeft(code);

			} else if (code === 39){ 
				moveRight(code);

			} else if (code === 38) { 
				moveUp(code);	

			} else if (code === 40){  
				moveDown(code);

			}

		});

	} else {
		
		$(window).off("swipeleft");
		$(window).on("swipeleft", function(event) {
			var direction = "left";
			moveLeft(direction);
		});

		$(window).off("swiperight");
		$(window).on("swiperight", function(event) {
			var direction = "right";
			moveRight(direction);
		});

		$(window).off("swipeup");
		$(window).on("swipeup", function(event) {
			var direction = "up";
			moveUp(direction);
		});

		$(window).off("swipedown");
		$(window).on("swipedown", function(event) {
			var direction = "down";
			moveDown(direction);
		});
	}
}

function merge (grid, codeDirection) {
	if(codeDirection === 37 || codeDirection === "left") {
			for (var i = 0; i < grid.length; i++) {
				for (var j = 0; j < grid.length - 1; j++) {

					if (grid[i][j] === grid[i][j+1]) {
						grid[i][j] += grid[i][j+1];
						grid[i].splice(j + 1,1);
						grid[i].push(0);
						score += grid[i][j];
						$('#score h5').text(score);

						if (grid[i][j] + grid[i][j+1] === 3072) {
							win();
						}
					}
				}
			}

			newTile(grid, codeDirection);
		} else if (codeDirection === 39 || codeDirection === "right") {

			for (var i = 0; i < grid.length; i++) {
				for (var j = grid.length -1; j >= 1; j--) {

					if (grid[i][j] === grid[i][j-1]) {
						grid[i][j] += grid[i][j-1];
						grid[i].splice(j - 1,1);
						grid[i].unshift(0);
						score += grid[i][j];
						$('#score h5').text(score);

						if (grid[i][j] + grid[i][j-1] === 3072) {
							win();
						}
					}
				}
			}

			newTile(grid, codeDirection);

		} else if(codeDirection === 38 || codeDirection === "up") {


			for (var i = 0; i < grid.length - 1; i++) {
				for (var j = 0; j <= grid.length-1; j++) {

					if (grid[i][j] === grid[i + 1][j]) {
						grid[i][j] += grid[i + 1][j];
						score += grid[i][j];
						$('#score h5').text(score);

						if (i === 0) {
							grid[i + 1][j] = grid[i + 2][j];
							grid[i + 2][j] = grid[i + 3][j];
							grid[i + 3][j] = 0;

						} else if (i === 1) {
							grid[i+1][j] = grid[i+2][j];
							grid[i+2][j] = 0;

						} else if (i === 2) {
							grid[i+1][j] =0;

						}

						
						if (grid[i][j] + grid[i +1][j] === 3072) {
							win();
						}
					}
				}
			}

		newTile(grid, codeDirection);
		
	} else if(codeDirection === 40 || codeDirection === "down") {

		for (var i = grid.length-1; i >= 1; i--) {
				for (var j = 0; j <= grid.length-1; j++) {

					if (grid[i][j] === grid[i - 1][j]) {
							grid[i][j] += grid[i - 1][j];
							score += grid[i][j];
							$('#score h5').text(score);

						if (i === grid.length-1) {
							grid[i - 1][j] = grid[i - 2][j];
							grid[i - 2][j] = grid[i - 3][j];
							grid[i - 3][j] = 0;
							
						} else if (i === grid.length-2) {
							grid[i-1][j] = grid[i-2][j];
							grid[i-2][j] = 0;

						} else if (i === grid.length- 3) {
							grid[i-1][j] =0;
						}



						if (grid[i][j] + grid[i - 1][j] === 3072) {
							win();
						}
					}
				}
			}
			newTile(grid, codeDirection);
	}
}

	function newTile(merged_grid, codeDirection) {
		var newTileGenerated = false;
		var x;
		var y;
		var tileValue;

		// returns a random number withing a givin range
		var rand = function (start, end) {
			return Math.floor(Math.random() * ((end-start)+1) + start);
		};
		// checks to see if the randomly selected cell has a value of 0
		var tileCheck = function(value, row, column) {
			if (value === 0) {
				newTileGenerated = true;
				merged_grid[row][column] = 3;
			}
		};

		// until a new tile with a zero value has been selected keep genereating new tiles
		while (newTileGenerated === false) {

			if (codeDirection === 37 || codeDirection === "left") {
				x = rand(0,3)
				y = rand(2,3)
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x, y);

			} else if (codeDirection === 39 || codeDirection === "right") {
				x = rand(0,3)
				y = rand(0,1)
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x, y);

			} else if (codeDirection === 38 || codeDirection === "up") {
				x = rand(2,3)
				y = rand(0,3)
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x, y);

			} else if (codeDirection === 40 || codeDirection === "down") {
				x = rand(0,1)
				y = rand(0,3)
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x , y);

			}
		}

		set_merged(merged_grid);
		slide(merged_grid);
	}

	function set_merged(results) {
		// reset the grid
		$('td').each(function(){
			$(this).empty().removeClass();
		});

		// set the new grid
		for (var i = 0; i < results.length; i++) {
		 	for (var j = 0; j < results.length; j++) {
				var item = results[i][j];
				if (item != 0) {
					var cell = $('td[id=' + i + "" + j + ']').text(item);
					switch (item) {
						case 3:
							cell.addClass('three'); break;
						case 6:
							cell.addClass('six'); break;
						case 12:
							cell.addClass('twelve'); break;
						case 24:
							cell.addClass('twenty-four'); break;
						case 48:
							cell.addClass('forty-eight'); break;
						case 96:
							cell.addClass('ninety-six'); break;
						case 192:
							cell.addClass('one-nine-two'); break;
						case 384:
							cell.addClass('three-eight-four'); break;
						case 768:
							cell.addClass('seven-six-eight'); break;
						case 1536:
							cell.addClass('one-five-three-six'); break;
						case 3072:
							cell.addClass('three-zero-seven-two'); break;
				}

				}
		 	}
		} 

	}
	});