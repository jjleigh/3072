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
		move();	
	}
	start_grid(grid);

	// the move function moves tiles in a particular direction based on which arrow is pressed
	function move() {

		$(window).on('keyup', function(event){
			if (event.keyCode === 37) {
				slide(grid,'left');
			} else if (event.keyCode === 38) {
				alert("you pressed the up key");				
				slide(grid,'up');
			} else if (event.keyCode === 39) {
				slide(grid,'right');
			} else if (event.keyCode === 40){	
				slide(grid,'down');
			}

		});

	}

	// this function takes iterates of the grid and for each row it slides all its values together and 
	// adds zeros if the new array length is less than 4

	function slide(grid, direction){
		var init = [[],[],[],[]];
 
		if (direction === "left") {

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

		} else if (direction === "right") {  // if right arrow is pressed 

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

		} else if (direction === "up") {  // if up arrow is pressed
			
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

		} else if (direction === "down"){  // if down arrow is pressed 

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
		return merge(init, direction);
	}

	function merge(grid, direction) { 
		var merged_result = [[],[],[],[]];
		var merged = false;

		if (direction === "right" || direction === "left") {

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

							if (grid[i][j] + grid[i][j+1] === 59049) {
								win();
							}
						} 
					} else {
						merged = false;
					}
				}
				if (direction === "right") {

					while(merged_result[i].length < 4) {
						merged_result[i].unshift(0);
					}
				} else if (direction === "left") {

					while(merged_result[i].length < 4) {
						merged_result[i].push(0);
					}
				}
			}

		} else if (direction === "up") {
			merged_result[0] = grid[0]; // set the first array to the be the same as the first arry in grid


			for (var i = 1; i < grid.length; i++) {
				for (var j = 0; j < grid.length; j++) {


						if (grid[i][j] === merged_result[i-1][j] || merged_result[i-1][j] === 0) { // if the current element is the same as the one above it in the column
																																											// OR if the previous element in the column is equal to 0 
							merged_result[i-1][j] += grid[i][j]; //then merge them
							score += merged_result[i-1][j] + grid[i][j];
							$('#score h5').text(score);
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
		} else if (direction === "down") {

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
		return newTile(merged_result, direction);
	}


	function newTile(merged_grid, direction) {
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


			if (direction === "left") {
				x = rand(0,3)
				y = rand(2,3)
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x, y);

			} else if (direction === "right") {
				x = rand(0,3)
				y = rand(0,1)
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x, y);

			} else if (direction === "up") {
				x = rand(2,3)
				y = rand(0,3)
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x, y);

			} else if (direction === "down") {
				x = rand(0,1)
				y = rand(0,3)
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x , y);

			}
		}
		return merged_grid;
		set_merged(merged_grid);
	}

	function set_merged(results) {

		$('td').each(function(){
			$(this).empty().removeClass();
		});
			for (var i = 0; i < results.length; i++) {
			 	for (var j = 0; j < results.length; j++) {
					var item = results[i][j];

					if (item != 0) {
						var cell = $('td[id=' + i + "" + j + ']').text(item);
					}
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

