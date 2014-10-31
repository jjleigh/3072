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
			slide(grid);
		});
	}
	start_grid(grid);

function slide(grid){
	var init = [[],[],[],[]];

 	$(window).on('keyup', function(event){
 		var code = event.keyCode;
		if (code === 37) {
		  alert("your pressed the left arrow");
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
			set_merged(init);
		});

	}
	function set_merged(results) {
		// reset the grid
		// $('td').each(function(){
		// 	$(this).empty().removeClass();
		// });
		// set the new grid

		for (var i = 0; i < results.length; i++) {
		 	for (var j = 0; j < results.length; j++) {
				var item = results[i][j];
				if (item !== 0) {
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
				}
		 	}
		} 
	}


	});