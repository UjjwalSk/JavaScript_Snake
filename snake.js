class Snake {
	constructor() {
		this.body = [];
		this.body[0] = createVector(floor(w / 2), floor(h / 2));
		this.x = 1;
		this.y = 0;
	}

	show() {
		for (let i = 0; i < this.body.length; ++i) {
			fill(255);
			noStroke();
			rect(this.body[i].x, this.body[i].y, 1, 1, 1);
		}
	}

	update() {
		let head = this.body[this.body.length - 1].copy();
		this.body.shift();
		head.x += this.x;
		head.y += this.y;
		this.body.push(head);
	}

	setDir(x, y) {
		this.x = x;
		this.y = y;
	}

	grow() {
		let head = this.body[this.body.length - 1].copy();
		this.body.push(head);
	}

	endGame() {
		let head = this.body[this.body.length - 1];
		let x = head.x;
		let y = head.y;

		if (document.querySelector("#walls").checked) {
			canvas.style("box-shadow", "0 0 10px red");
			if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
				return true;
			}
		} else {
			canvas.style("box-shadow", "none");
			if (x > w - 1) {
				head.x = 0;
			} else if (x < 0) {
				head.x = w - 1;
			} else if (y > h - 1) {
				head.y = 0;
			} else if (y < 0) {
				head.y = h - 1;
			}
		}

		for (let i = 0; i < this.body.length - 1; ++i) {
			let part = this.body[i];
			if (part.x == x && part.y == y) {
				return true;
			}
		}
	}

	eat(food) {
		if (
			this.body[this.body.length - 1].x == food.x &&
			this.body[this.body.length - 1].y == food.y
		) {
			this.grow();
			return true;
		}
	}
}
