// var g = [[0,2,4,4], [8,0,0,8], [0,4,0,0],[8,8,4,4]];

$(document).ready(function(){

	var turn = 0;
	var grid = [[0,0,0,0], [0,0,0,0], [0,0,0,0],[0,0,0,0]];
	var score = 0;

	function start_grid(grid) {

		$(window).on('load', function(){

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
		});
		slide(grid);
	}
	start_grid(grid);

function slide(grid){
	var init = [[],[],[],[]];

 	$(window).on('keyup', function(event){
 		var code = event.keyCode;
		if (code === 37) {

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

		} else if (code === 39) {  // if right arrow is pressed 

			for (var i = 0; i < grid.length; i++) {
				for (var j = 0; j < grid.length; j++) {
					
					if (grid[i][j] > 0) {
						init[i].push(grid[i][j]);	
					}			
				}
				while (init.length < 4) {
					init[i].unshift(0);
				}
			}

		} else if (code === 38) {  // if up arrow is pressed
			
				for (var i = 0; i < grid.length; i++) {
					for (var j = 0; j < grid.length; j++) {

						if (i === 0) {
							init[i].push(grid[i][j]);
						} else {
							if (init[i-1][j] !== 0) {

								init[i].push(grid[i][j]);

							} else if (init[i-1][j] === 0) {

								init[i-1][j] = grid[i][j];
								init[i][j] = 0;
							} 
						}
					}
					
				}

		} else if (code === 40){  // if down arrow is pressed 

			for (var i = grid.length - 1; i > -1; i--) {
				for (var j = 0; j < grid.length; j++) {

					if (i === 3) {
							init[i].push(grid[i][j]);
					} else {
						if (init[i+1][j] !== 0) {

							init[i].push(grid[i][j]);

						} else if (init[i+1][j] === 0) {

							init[i+1][j] = grid[i][j];
							init[i][j] = 0;
						} 
					}
				}
			}
		}
		return merge(init, code);
		});
	}

	function merge(grid, code) { 
		var merged_result = [[],[],[],[]];
		var merged = false;

		if (code === 39 || code === 37) {

			for (var i = 0; i < grid.length; i++) {
				for (var j = 0; j < grid.length; j++) {


					if (merged !== true) {
						
						if (grid[i][j] !== grid[i][j+1] && grid[i][j] !== 0){
							merged_result[i].push(grid[i][j]);
						} else if (grid[i][j] === grid[i][j+1]) {
							merged_result[i].push(grid[i][j] + grid[i][j+1]);
							merged = true;

							if (grid[i][j] + grid[i][j+1] === 59049) {
								win();
							}
						} 
					} else {
						merged = false;
					}
				}
				if (code === 39) {

					while(merged_result[i].length < 4) {
						merged_result[i].unshift(0);
					}
				} else if (code === 37) {

					while(merged_result[i].length < 4) {
						merged_result[i].push(0);
					}
				}
			}

		} else if (code === 38) {
			merged_result[0] = grid[0]; // set the first array to the be the same as the first arry in grid


			for (var i = 1; i < grid.length; i++) {
				for (var j = 0; j < grid.length; j++) {


						if (grid[i][j] === merged_result[i-1][j] || merged_result[i-1][j] === 0) { // if the current element is the same as the one above it in the column
																																											// OR if the previous element in the column is equal to 0 
							merged_result[i-1][j] += grid[i][j]; //then merge them
							merged_result[i][j] = 0; //and set the current element in the new array to be 0


							if (grid[i][j] + grid[i][j+1] === 59049) {
								win();
							}

						}  else if (grid[i][j] !== merged_result[i-1][j] ) { // if the current element in grid is not 
																																//the same as the previous one in the column

								merged_result[i][j] = grid[i][j]; // then set that current grid element to be the the current element in the new array
						}

				}
			}
		} else if (code === 40) {

			merged_result[merged_result.length-1] = grid.slice(-1)[0]; // this sets the last element in the merged results array to
																													// be the last element in the grid array

			for (var i = grid.length -2; i > grid.length -1; i--) {
				for (var j = 0; j < grid.length; j++) {

					if (grid[i][j] === merged_result[i+1][j] || merged_result[i+1][j] === 0) {

						merged_result[i+1][j] += grid[i][j];
						merged_result[i][j] = 0;

						if (grid[i][j] + grid[i][j+1] === 3072) {
								win();
							}

					} else if (grid[i][j] !== merged_result[i+1][j]) {
						merged_result[i][j] = grid[i][j];
					}
				}
			}
		}
		return newTile(merged_result, code);
	}


	function newTile(merged_grid, code) {
		var newTileGenerated = false;
		var x;
		var y;
		var tile;

		// returns a random number withing a givin range
		var rand = function (start, end) {
			return Math.floor(Math.random() * ((end-start)+1) + start);
		};
		// checks to see if the randomly selected cell has a value of 0
		var tileCheck = function(value, row, column) {
			if (value === 0) {
				newTileGenerated = true;
				merged_grid[row][column] = 2;
			}
		};
		// until a new tile with a zero value has been selected keep genereating new tiles
		while (newTileGenerated === false) {


			if (code === 37) {
				x = rand(0,3);
				y = rand(2,3);
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x, y);

			} else if (code === 39) {
				x = rand(0,3);
				y = rand(0,1);
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x, y);

			} else if (code === 38) {
				x = rand(2,3);
				y = rand(0,3);
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x, y);

			} else if (code === 40) {
				x = rand(0,1);
				y = rand(0,3);
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x , y);

			}
		}
		return merged_grid;
		// set_merged(merged_grid);
	}
	function set_merged(results) {
			for (var i = 0; i < results.length; i++) {
			 	for (var j = 0; j < results.length; j++) {
					var item = results[i][j];
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
						default:
							cell.addClass('three'); break;
					}
			 	}
			 }
			 return results; 
		}
	function win() {
		 var answer = confirm("congrats! you won. Would you like to play again?");

		if (answer === true) {location.reload();}

		// $('table').css({});
	}

	function lose() {
		var answer = confirm("Awe thats sucks, would you like to play again?");
		if (answer === true) {location.reload();}

	}


	});