$(document).ready(function(){
		var result = [];

	function move() {

		$('body').keyup(function(event){
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

	};

	move();

	function newTile() {

	};

	function merge() {
		var result = [];

	};

	function playAgain() {
		var answer = confirm("would you like to play again?")

		if (answer) {
			location.reload();
		}

	};



});