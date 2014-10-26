function slide(grid){
	var init = [[],[],[],[]];


	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid.length; j++) {

			if (grid[i][j] > 0) {
				init[i].push(grid[i][j]);
			}			
		};
		while (init[i].length < 4) {
			init[i].push(0);
		}
	};


	return init;
}
var grid = [[0,0,2,0], [0,2,0,0], [0,0,0,0],[0,0,0,0]];