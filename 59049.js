$(document).ready(function(){
		var turn = 0;
		var grid = [[0,0,0,0],
								[0,0,0,0],
								[0,0,0,0],
								[0,0,0,0]];



	// the move function moves tiles in a particular direction based on which arrow is pressed
	function move() {

		$(window).on('keyup', function(event){
			if (event.keyCode === 37) {
				alert("you pressed the left button");
			} else if (event.keyCode === 38) {
				alert("you pressed the up button");
			} else if (event.keyCode === 39) {
				alert("you pressed the right button");
			} else if (event.keyCode === 40){
				alert("you pressed the down button");
			}

		});
	merge();
	newTile();

		turn++;
		if (turn >= 10) {
			win();
		}

	};

	move();
	// Adds a new tile to a random empty cell on the grid
	function newTile(grid) {
		var current = Math.floor((Math.random() * 4) + 2);

		if (current !== 2 || current !== 4) {

		}

		$('td').text().css({})
		
		Math.floor((Math.random() * 4));

	};

	// this function takes a row and slides all its values together

	function slide(line){
		var result = [];

		for (var i = 0; i < line.length; i++) {
			if (line[i] > 0) {
				result.push(line[i]);	
			}			
		};

		while (result.length < 4) {
			result.push(0);
		}
		return result;
		merge(result);
	}

	// merge function adds adjacent tiles with the same number to form a new tile with their sum.
	function merge(line) {
		var merged_result = [];
		var merged = false;

		for (var i = 0; i < line.length; i++) {

				if (merged !== true) {
					
					if (line[i] !== line[i+1]){
						merged_result.push(line[i]);
					} else if (line[i] === line[i+1]) {
						merged_result.push(line[i] + line[i+1]);
						merged = true;
					} 
				} else {
					merged = false;
				}
		};



		while(merged_result.length < 4) {
			merged_result.push(0);
		}

		return merged_result;
	};

	l = [2,4,4,0]
	





	// win function checks for a winner after a certain amount of turns
	function win() {

	};




	// play again function restarts game if confirmed yes

	function playAgain() {
		var answer = confirm("would you like to play again?")

		if (answer) {
			location.reload();
		}

	};



});