


// function slide(grid) {

// 	$(window).off('keyup');
// 	$(window).on('keyup', function(event){
// 		code = event.keyCode;
// 		// console.log("fired keyup: " + code);

// 		if (code === 37) {

// 			for (var i = 0; i <= grid.length-1; i++) {
// 				for (var j = 0; j <= grid.length-1; j++) {

// 					if ( j === 0) {
// 					 if (grid[i][j] === 0 && grid[i][j+1] === 0 && grid[i][j+2] === 0) {
// 					 		grid[i].splice(j,3);
// 					 		grid[i].push(0,0,0);

// 					 	} else if (grid[i][j] === 0  && grid[i][j+1] === 0) {
// 									grid[i].splice(j,2);
// 									grid[i].push(0,0);

// 							} else if (grid[i][j] === 0) {
// 									grid[i].splice(j,1);
// 									grid[i].push(0);
// 							}
// 					} else {

// 						if (grid[i][j] === 0  && grid[i][j+1] === 0) {
// 								grid[i].splice(j,2);
// 								grid[i].push(0,0);

// 						} else if (grid[i][j] === 0) {
// 								grid[i].splice(j,1);
// 								grid[i].push(0);
// 						}

// 					}

					
// 				};
// 			};
// 		} else if (code === 39) {

// 				for (var i = 0; i <= grid.length-1; i++) {
// 					for (var j = grid.length-1; j >= 0; j--) {

// 						if ( j === grid.length-1) {
// 							if (grid[i][j] === 0 && grid[i][j-1] === 0 && grid[i][j-2] === 0) {
// 							 		grid[i].splice(j-2,3);
// 							 		grid[i].unshift(0, 0, 0);

// 							} else if (grid[i][j] === 0  && grid[i][j-1] === 0) {
// 									grid[i].splice(j-1,2);
// 									grid[i].unshift(0,0);

// 							} else if (grid[i][j] === 0) {
// 									grid[i].splice(j,1);
// 									grid[i].unshift(0);
// 							}
// 						} else {

// 							if (grid[i][j] === 0  && grid[i][j-1] === 0) {
// 									grid[i].splice(j-1,2);
// 									grid[i].unshift(0,0);

// 							} else if (grid[i][j] === 0) {
// 									grid[i].splice(j,1);
// 									grid[i].unshift(0);
// 							}
// 						}
// 					};
// 				};

// 		} else if (code === 38) {
// 			for (var i = 1; i <= grid.length-2; i++) {
// 				for (var j = 0; j < grid.length-1; j++) {

// 					if ( i === 1) {

// 							if (grid[i - 1][j] === 0 && grid[i][j] > 0){ // if last = 0 and current > 0

// 								grid[i - 1][j] = grid[i][j];
// 								grid[i][j] = 0;

// 							} else if (grid[i - 1][j] === 0 && grid[i][j] === 0 && grid[i + 1][j] === 0) { // if last = 0 and current = 0 and next = 0

// 								grid[i - 1][j] =  grid[i + 2][j];
// 								grid[i][j] = 0;
// 								grid[i + 1][j] = 0;
// 								grid[i + 2][j] = 0;

// 							} else if (grid[i - 1][j] === 0 && grid[i][j] === 0 && grid[i + 1][j] > 0) { // if last = 0 and current = 0 and next > 0

// 								grid[i - 1][j] = grid[i + 1][j];
// 								grid[i][j] = 0;
// 								grid[i + 1][j] = 0;


// 							} else if (grid[i][j] === 0 && grid[i + 1][j] > 0) { // if current = 0 and next > 0

// 									grid[i][j] = grid[i + 1][j];
// 									grid[i + 1][j] = 0;
// 							}
// 					} else {

// 							if (grid[i][j] === 0 && grid[i-1][j] === 0 && grid[i-2][j] === 0) { // if current = 0 & last = 0 & very last = 0

// 									grid[i-2][j] = grid[i+1][j];
// 									grid[i-1][j] = 0;
// 									grid[i][j] = 0;
// 									grid[i+1][j] = 0;

// 							} else if (grid[i][j] === 0 && grid[i-1][j] === 0) { // if current = 0 & last = 0 

// 									grid[i-1][j] = grid[i+1][j];
// 									grid[i][j] = 0;
// 									grid[i+1][j] = 0;

// 							} else if (grid[i][j] === 0 && grid[i + 1][j] > 0) { // if current = 0 & next > 0

// 									grid[i][j] = grid[i + 1][j];
// 									grid[i + 1][j] = 0;

// 							} else if (grid[i-1][j] === 0 && grid[i][j] > 0 ) { //  if last = 0 and current > 0 

// 									grid[i-1][j] = grid[i][j];
// 									grid[i][j] = grid[i + 1][j];
// 									grid[i + 1][j] = 0;
// 							} 

// 					}
					
// 				};
// 			};

// 		} else if (code === 40) {

// 			for (var i = 2; i >= grid.length-3; i--) {
// 				for (var j = 0; j <= grid.length-1; j++) {

// 					if ( i === 2 ) {
// 							if (grid[i + 1][j] === 0 && grid[i][j] > 0){ // if last = 0 and current > 0 

// 								grid[i + 1][j] = grid[i][j];
// 								grid[i][j] = 0;

// 							} else if (grid[i + 1][j] === 0 && grid[i][j] === 0 && grid[i - 1][j] === 0) { //if last = 0 and current = 0 and next = 0


// 								grid[i + 1][j] =  grid[i - 2][j];
// 								grid[i][j] = 0;
// 								grid[i - 1][j] = 0;
// 								grid[i - 2][j] = 0;

// 							} else if (grid[i + 1][j] === 0 && grid[i][j] === 0 && grid[i - 1][j] > 0) { //if last = 0 and current = 0 and next > 0

// 								grid[i + 1][j] = grid[i - 1][j];
// 								grid[i][j] = 0;
// 								grid[i - 1][j] = 0;


// 							} else if (grid[i][j] === 0 && grid[i - 1][j] > 0) { //current = 0 and next > 0

// 									grid[i][j] = grid[i - 1][j];
// 									grid[i - 1][j] = 0;
// 							}
// 					} else {

// 							if (grid[i][j] === 0 && grid[i+1][j] === 0 && grid[i+2][j] === 0) { // if current = 0 & last = 0 & very last = 0

// 								grid[i+2][j] = grid[i-1][j];
// 								grid[i+1][j] = 0;
// 								grid[i][j] = 0;
// 								grid[i-1][j] = 0;

// 							} else if (grid[i][j] === 0 && grid[i+1][j] === 0) { // if current = 0 & last = 0 

// 								grid[i+1][j] = grid[i-1][j];
// 								grid[i][j] = 0;
// 								grid[i-1][j] = 0;

// 							} else if (grid[i][j] === 0 && grid[i - 1][j] > 0) { // if current = 0 & next > 0

// 								grid[i][j] = grid[i - 1][j];
// 								grid[i - 1][j] = 0;

// 							} else if (grid[i+1][j] === 0 && grid[i][j] > 0 ) { //  if last = 0 and current > 0 

// 								grid[i+1][j] = grid[i][j];
// 								grid[i][j] = grid[i - 1][j];
// 								grid[i - 1][j] = 0;
// 							} 
// 					}
						
// 				};
// 			};


// 		}
// 		merge(grid, code);


// 	});
	

// }

function slide (grid, code) {
		if (code === 37 || code === 39) {
			for (var i = 0; i <= grid.length-1; i++) {
				for (var j = 0; j <= grid.length-1; j++) {

					 if (grid[i][j] === 0 && code === 37) {
					 		grid[i].splice(j,1);
					 		grid[i].push(0);

					 } else if (grid[i][j] === 0 && code === 39) {
					 		grid[i].splice(j,1);
					 		grid[i].unshift(0);
					 }
				};
			};
		} else if (code === 38) {
			for (var i = 1; i <= grid.length-2; i++) {
				for (var j = 0; j < grid.length-1; j++) {

					if ( i === 1) {

							if (grid[i - 1][j] === 0 && grid[i][j] > 0){

								grid[i - 1][j] = grid[i][j];
								grid[i][j] = 0;

							} else if (grid[i - 1][j] === 0 && grid[i][j] === 0 && grid[i + 1][j] === 0) {

								grid[i - 1][j] =  grid[i + 2][j];
								grid[i][j] = 0;
								grid[i + 1][j] = 0;

							} else if (grid[i - 1][j] === 0 && grid[i][j] === 0 && grid[i + 1][j] > 0) {

								grid[i - 1][j] = grid[i + 1][j];
								grid[i][j] = 0;
								grid[i + 1][j] = 0;


							} else if (grid[i][j] === 0 && grid[i + 1][j] > 0) {

									grid[i][j] = grid[i + 1][j];
									grid[i + 1][j] = 0;
							}
					} else {

							if (grid[i][j] === 0 && grid[i-1][j] === 0 && grid[i-2][j] === 0) { // if current = 0 & last = 0 & very last = 0

									grid[i-2][j] = grid[i+1][j];
									grid[i-1][j] = 0;
									grid[i][j] = 0;
									grid[i+1][j] = 0;

							} else if (grid[i][j] === 0 && grid[i-1][j] === 0) { // if current = 0 & last = 0 

									grid[i-1][j] = grid[i+1][j];
									grid[i][j] = 0;
									grid[i+1][j] = 0;

							} else if (grid[i][j] === 0 && grid[i + 1][j] > 0) { // if current = 0 & next > 0

									grid[i][j] = grid[i + 1][j];
									grid[i + 1][j] = 0;

							} else if (grid[i-1][j] === 0 && grid[i][j] > 0 ) { //  if last = 0 and current > 0 

									grid[i-1][j] = grid[i][j];
									grid[i][j] = grid[i + 1][j];
									grid[i + 1][j] = 0;
							} 

					}
					
				};
			};

		} else if (code === 40) {

			for (var i = 2; i >= grid.length-3; i--) {
				for (var j = 0; j <= grid.length-1; j++) {

					if ( i === 2 ) {
							if (grid[i + 1][j] === 0 && grid[i][j] > 0){ // if last = 0 and current > 0 

								grid[i + 1][j] = grid[i][j];
								grid[i][j] = 0;

							} else if (grid[i + 1][j] === 0 && grid[i][j] === 0 && grid[i - 1][j] === 0) { //if last = 0 and current = 0 and next = 0


								grid[i + 1][j] =  grid[i - 2][j];
								grid[i][j] = 0;
								grid[i - 1][j] = 0;
								grid[i - 2][j] = 0;

							} else if (grid[i + 1][j] === 0 && grid[i][j] === 0 && grid[i - 1][j] > 0) { //if last = 0 and current = 0 and next > 0

								grid[i + 1][j] = grid[i - 1][j];
								grid[i][j] = 0;
								grid[i - 1][j] = 0;


							} else if (grid[i][j] === 0 && grid[i - 1][j] > 0) { //current = 0 and next > 0

									grid[i][j] = grid[i - 1][j];
									grid[i - 1][j] = 0;
							}
					} else {

							if (grid[i][j] === 0 && grid[i+1][j] === 0 && grid[i+2][j] === 0) { // if current = 0 & last = 0 & very last = 0

								grid[i+2][j] = grid[i-1][j];
								grid[i+1][j] = 0;
								grid[i][j] = 0;
								grid[i-1][j] = 0;

							} else if (grid[i][j] === 0 && grid[i+1][j] === 0) { // if current = 0 & last = 0 

								grid[i+1][j] = grid[i-1][j];
								grid[i][j] = 0;
								grid[i-1][j] = 0;

							} else if (grid[i][j] === 0 && grid[i - 1][j] > 0) { // if current = 0 & next > 0

								grid[i][j] = grid[i - 1][j];
								grid[i - 1][j] = 0;
							} else if (grid[i+1][j] === 0 && grid[i][j] > 0 ) { //  if last = 0 and current > 0 

								grid[i+1][j] = grid[i][j];
								grid[i][j] = grid[i - 1][j];
								grid[i - 1][j] = 0;
							} 
					}
						
				};
			};


		}
	
	merge(grid, code);
}

var g = [[0,2,4,4],[0,8,4,4], [8,4,4,8] ,[8,2,4,4]];
var k = [[0,3,3,3],[0,3,0,0], [3,0,0,0] ,[0,3,0,3]];
var m = [[3,0,3,0],[3,0,3,3], [0,0,3,3] ,[0,3,0,3]];



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
