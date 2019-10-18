class Population {
	rockets = [];
	populationSize = 100;
	matingPool = [];
	fitP = createP();

	constructor() {
		for (let i = 0; i < this.populationSize; i++) {
			this.rockets[i] = new Rocket(null, i);
		}
	}

	run = function () {
		count++;
		for (let i = 0; i < this.populationSize; i++) {
			this.rockets[i].update();
			if (drawRockets.checked())
				this.rockets[i].show();
		}
	}

	evaluate = function () {
		var maxFit = 0;
		for (let i = 0; i < this.populationSize; i++) {
			this.rockets[i].calcFitness();
			maxFit = Math.max(this.rockets[i].fitness, maxFit);
		}
		globalMaxFit = Math.max(globalMaxFit, maxFit);
		this.fitP.html('maxFit: ' + maxFit + ' / ' + globalMaxFit);

		if (globalMaxFit > 70000) {
			mutationSlider.value(1);
		}

		for (let i = 0; i < this.populationSize; i++) {
			this.rockets[i].fitness /= maxFit;
		}

		this.matingPool = [];

		for (let i = 0; i < this.populationSize; i++) {
			var n = this.rockets[i].fitness * 100;
			for (let j = 0; j < n; j++) {
				this.matingPool.push(this.rockets[i]);
			}
		}
	}

	selection = function () {
		var newRockets = [];
		for (let i = 0; i < this.rockets.length; i++) {
			var parentA = random(this.matingPool);
			var parentB = random(this.matingPool);
			try {
				var childDNA = parentA.dna.crossover(parentB.dna);
			} catch (e) {
				childDNA = new DNA();
			}
			childDNA.mutation();
			newRockets[i] = new Rocket(childDNA, i);
		}
		this.rockets = newRockets;
	}
}