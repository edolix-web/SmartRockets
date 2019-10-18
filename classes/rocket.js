class Rocket {
	position = startPosition.copy();
	velocity = createVector();
	acceleration = createVector();
	dna;
	fitness;
	id;
	distanceToTarget;
	framesToTarget = 0;
	completed = false;
	crashed = false;
	crashedObstacle = obstacles.length / 2;

	constructor(dna, id) {
		this.id = id;
		if (dna) {
			this.dna = dna;
		} else {
			this.dna = new DNA();
		}
	}

	applyForce = function (force) {
		this.acceleration.add(force);
	}

	update = function () {
		var d = dist(this.position.x, this.position.y, target.x, target.y);
		if (d < 20) {
			this.completed = true;
			this.position = target.copy();
		}
		if (this.position.x > width || this.position.x < 0 || this.position.y > height || this.position.y < 0) {
			this.crashed = true;
			this.framesToTarget = lifespan;
		}
		var cCount = 0;
		obstacles.forEach(obstacle => {
			if (this.obstacleHit(obstacle)) {
				this.crashed = true;
				this.crashedObstacle = cCount;
				this.framesToTarget = lifespan;
			}
			cCount++;
		});
		// Check distance before aplying force
		var startDistance = dist(target.x, target.y, this.position.x, this.position.y);
		this.applyForce(this.dna.genes[count].vector);
		if (!this.completed && !this.crashed) {
			this.framesToTarget++;
			this.velocity.add(this.acceleration);
			this.position.add(this.velocity);
			this.acceleration.mult(0);
		} else {
			this.dna.genes[count].finalDistance = dist(target.x, target.y, this.position.x, this.position.y);
		}
		var finishDistance = dist(target.x, target.y, this.position.x, this.position.y);
		this.dna.genes[count].attribution = startDistance - finishDistance;
	}

	obstacleHit = function (obstacle) {
		if (this.position.y > obstacle.y && this.position.y < obstacle.y + obstacle.height) {
			if (this.position.x > obstacle.x && this.position.x < obstacle.x + obstacle.width) {
				return true;
			} else {
				return false;
			}
		}
	}

	show = function () {
		push();
		noStroke();
		fill(255, 100);
		translate(this.position.x, this.position.y);
		rotate(this.velocity.heading());
		rectMode(CENTER);
		rect(0, 0, 24, 5);
		// fill(0, 0, 0);
		// text(this.id, 0, 3);
		pop();
	}

	calcFitness = function () {
		// Calculate fitness based on the distance to the target
		this.distanceToTarget = dist(this.position.x, this.position.y, target.x, target.y);
		this.fitness = map(this.distanceToTarget, 0, width, width, 0);
		if (this.completed) {
			this.fitness *= 100;
		}
		if (this.crashed) {
			this.fitness /= Math.pow(((obstacles.length - 1) * 10 - this.crashedObstacle * 10 + 10), 2);
		}

		// Calculate fitness based on the frames it took to get the target
		this.fitness += (lifespan - this.framesToTarget) * 40;
	}
}