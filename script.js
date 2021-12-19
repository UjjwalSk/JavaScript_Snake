let snake;
let size = 20;
let food;
let w, h;
let curr = document.getElementById("curr");
let high = document.getElementById("high");
let currScore = 0;
let canvas;

if (!localStorage.highScore) {
	localStorage.setItem("highScore", 0);
}

function setup() {
	canvas = createCanvas(700, 500);
	w = floor(width / size);
	h = floor(height / size);
	snake = new Snake();
	frameRate(5);
	foodLocation();
}

function foodLocation() {
	let x = floor(random(w));
	let y = floor(random(h));
	food = createVector(x, y);
}

function draw() {
	scale(size);
	background(41, 39, 39);
	if (snake.eat(food)) {
		currScore += 1;
		if (currScore > Number(localStorage.highScore)) {
			localStorage.highScore = currScore;
		}
		foodLocation();
	}
	snake.update();
	snake.show();
	curr.innerText = currScore;
	high.innerText = localStorage.highScore;
	if (snake.endGame()) {
		background(255, 0, 0);
		alert("GAME OVER!!!\nRefresh to start again :]");
		noLoop();
	}

	noStroke();
	fill(255, 0, 0);
	rect(food.x, food.y, 1, 1, 1);
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		snake.setDir(-1, 0);
	} else if (keyCode === RIGHT_ARROW) {
		snake.setDir(1, 0);
	} else if (keyCode === DOWN_ARROW) {
		snake.setDir(0, 1);
	} else if (keyCode === UP_ARROW) {
		snake.setDir(0, -1);
	}
}
