$(document).ready(function(){
		var turn = 0;
		var grid = [[0,0,0,0], [0,0,0,0], [0,0,0,0],[0,0,0,0]];

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
		 			$('td[id=' + combo + ']').text(3).css({'background-color':"#F2E8DC", "color":'#8C8279'});
		 			count++;
	 			}
			}
			return grid;
			move();
		});
	}

	start_grid(grid);
	// the move function moves tiles in a particular direction based on which arrow is pressed
	function move() {

		$(window).on('keyup', function(event){
			if (event.keyCode === 37) {
				slide(grid,'left');
			} else if (event.keyCode === 38) {				
				slide(grid,'up');
			} else if (event.keyCode === 39) {
				slide(grid,'right');
			} else if (event.keyCode === 40){	
				slide(grid,'down');
			}

		});

	};
	// this function takes iterates of the grid and for each row it slides all its values together and 
	// adds zeros if the new array length is less than 4

	function slide(grid, direction){
		var init = [[],[],[],[]];
 
		if (direction === "left") {


			for (var i = 0; i < line.length; i++) {
				for (var j = 0; j < grid.length; j++) {

					if (grid[i][j] > 0) {
						init[i].push(grid[i][j]);	
					}			
				};
			};

			while (init.length < 4) {
				init[i].push(0);
			}
			merge(init, direction);

		} else if (direction === "right") {  // if right arrow is pressed 

			for (var i = 0; i < grid.length; i++) {
				for (var j = 0; j < grid.length; j++) {
					
					if (grid[i][j] > 0) {
						init[i].push(grid[i][j]);	
					}			
				};
			};

			while (init.length < 4) {
				init[i].unshift(0);
			}

			merge(init, direction);

		} else if (direction === "up") {  // if up arrow is pressed
			
				for (var i = 0; i < grid.length; i++) {
					for (var j = 0; j < grid.length; j++) {

						if (i === 0) {
							init[i].push(grid[i][j])
						} else {
							if (init[i-1][j] !== 0) {

								init[i].push(grid[i][j])

							} else if (init[i-1][j] === 0) {

								init[i-1][j] = grid[i][j]
								init[i][j] = 0
							} 
						}
					};
					
				};
				merge(init, direction);	

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
				merge(init, direction);
			}	


		}
	}

	// merge function adds adjacent tiles with the same number to form a new tile with their sum.
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

				return merged_result;

			} else if (direction === "down") {

				merged_result[merged_result.length-1] = grid.slice(-1)[0]; // this sets the last element in the merged results array to
																													// be the last element in the grid array

				for (var i = grid.length -2; i > grid.length -1; i--) {
					for (var j = 0; j < grid.length; j++) {

						if (grid[i][j] === merged_result[i+1][j] || merged_result[i+1][j] === 0) {

							merged_result[i+1][j] += grid[i][j];
							merged_result[i][j] = 0;


							if (grid[i][j] + grid[i][j+1] === 59049) {
									win();
								}


						} else if (grid[i][j] !== merged_result[i+1][j]) {
							merged_result[i][j] = grid[i][j];
						}
					}
				}
				return merged_result;
			}
		}


	// Adds a new tile to a random empty cell on the grid
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
				y = rand(0,1)
				tileValue = merged_grid[x][y];
				tileCheck(tileValue, x, y);

			} else if (direction === "right") {
				x = rand(0,3)
				y = rand(2,3)
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
	}

	// win function alerts that player has one and asks if they would like to play again
	function win() {
		 var answer = confirm("congrats! you won. Would you like to play again?");

		if (answer === true) {location.reload();}

		// $('table').css({});
	};


	// lose function restarts game if confirmed yes

	function lose() {
		var answer = confirm("Awe thats sucks, would you like to play again?")

		if (answer === true) {location.reload();}

	};

	
});

