
$(document).ready(function(){

	var grid = [[0,0,0,0], [0,0,0,0], [0,0,0,0],[0,0,0,0]];
		// var grid = { "00": 0, "01": 0, "02": 0, "03": 0,
		// 						 "10": 0, "11": 0, "12": 0, "13": 0,
		// 						 "20": 0, "21": 0, "22": 0, "23": 0,
		// 						 "30": 0, "31": 0, "32": 0, "33": 0
		// };


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
			slide(grid);
		});
	}
	start_grid(grid);

function slide(grid){
	
 	$(window).on('keyup', function(event){
		var init = [[],[],[],[]];
 		var code = event.keyCode;
		if (code === 37) { // 
		  // alert("you pressed the left arrow");
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

		} else if (code === 39){  // if right arrow is pressed 
			// alert("you pressed the right arrow");
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

		} else if (code === 38) {  // if up arrow is pressed
				// alert("you pressed the up arrow");
					
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

		} else if (code === 40){  // if down arrow is pressed 
			// alert("you pressed the down arrow");
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
		}
			merge(init, code);

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
							score += grid[i][j] + grid[i][j+1];
							$('#score h5').text(score);
							merged = true;

							if (grid[i][j] + grid[i][j+1] === 3072) {
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
							score += merged_result[i-1][j] + grid[i][j];
							$('#score h5').text(score);
							merged_result[i][j] = 0; //and set the current element in the new array to be 0


							if (grid[i][j] + grid[i][j+1] === 3072) {
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
						score += merged_result[i+1][j] + grid[i][j];
						$('#score h5').text(score);
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
		// set_merged(merged_result);
		newTile(merged_result, code);
		// return newTile(merged_result, direction);
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
				merged_grid[row][column] = 3;
			}
		};
		// until a new tile with a zero value has been selected keep genereating new tiles
		while (newTileGenerated === false) {


			if (code === 37) {
				x = rand(0,3)
				y = rand(2,3)
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x, y);

			} else if (code === 39) {
				x = rand(0,3)
				y = rand(0,1)
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x, y);

			} else if (code === 38) {
				x = rand(2,3)
				y = rand(0,3)
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x, y);

			} else if (code === 40) {
				x = rand(0,1)
				y = rand(0,3)
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x , y);

			}
		}
		set_merged(merged_grid);
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
				slide(results);
	}
	});
