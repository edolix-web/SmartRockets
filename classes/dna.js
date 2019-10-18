class DNA {
	genes = [];

	constructor(genes) {
		if (genes) {
			this.genes = genes;
		} else {
			for (let i = 0; i < lifespan; i++) {
				if (i < 20) {
					this.genes[i] = new Gene(createVector(-1, 0, 0));
				} else {
					this.genes[i] = new Gene();
				}
				this.genes[i].vector.setMag(0.2);
			}
		}
	}

	crossover = function (partner) {
		var newGenes = [];
		// ToDo: implement a more sophisticated crossover
		for (let i = 0; i < lifespan; i++) {
			this.genes[i].fitness = this.genes[i].attribution + this.genes[i].finalDistance;
			partner.genes[i].fitness = partner.genes[i].attribution + partner.genes[i].finalDistance;
			if (this.genes[i].fitness > partner.genes[i].fitness) {
				newGenes[i] = this.genes[i];
			} else {
				newGenes[i] = partner.genes[i];
			}
		}
		// var midpoint = floor(random(lifespan));
		// for (let i = 0; i < lifespan; i++) {
		// 	if (i > midpoint) {
		// 		newGenes[i] = this.genes[i];
		// 	} else {
		// 		newGenes[i] = partner.genes[i];
		// 	}
		// }
		return new DNA(newGenes);
	}

	mutation = function () {
		for (let i = 0; i < this.genes.length; i++) {
			if (random(1) < mutationRate / 100) {
				if (i < 20) {
					this.genes[i] = new Gene(createVector(-1, 0, 0));
				} else {
					this.genes[i] = new Gene();
				}
				this.genes[i].vector.setMag(0.2);
			}
		}
	}
}