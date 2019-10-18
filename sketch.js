var population;
var lifespan = 1000;
var count = 0;
var lifeP;
var genP;
var target;
var generation = 1;
var maxDistance = 0;
var startPosition;
var iterationsPerFrame;
var ips;
var mutationSlider;
var mutationRateText;
var mutationRate = 1; // %
var obstacles = [];
var drawRockets;
var globalMaxFit = 0;

function setup() {
  drawRockets = createCheckbox('Draw Rockets', true);
  obstacles[0] = new Obstacle(250, 800, 420, 32);
  obstacles[1] = new Obstacle(0, 650, 250, 32);
  obstacles[2] = new Obstacle(250, 500, 420, 32);
  obstacles[3] = new Obstacle(0, 350, 250, 32);
  obstacles[4] = new Obstacle(250, 150, 420, 32);
  obstacles[5] = new Obstacle(0, 0, 500, 5);
  iterationsPerFrame = createSlider(1, 100, 20, 1);
  mutationSlider = createSlider(0, 150, 10, 1);
  ips = createP('IPS: ' + iterationsPerFrame.value() / 10);
  mutationRateText = createP('Mutation Rate: ' + mutationSlider.value());
  createCanvas(500, 1000);
  startPosition = createVector(width / 2, height - 5);
  population = new Population();
  lifeP = createP();
  genP = createP();
  target = createVector(width / 2, 13);
  maxDistance = dist(target.x, target.y, startPosition.x, startPosition.y);
}

function draw() {
  mutationRate = mutationSlider.value() / 10;
  ips.html('IPS: ' + iterationsPerFrame.value());
  mutationRateText.html('Mutation Rate: ' + mutationSlider.value() / 10);
  background(0);
  obstacles.forEach(obstacle => {
    obstacle.draw();
  });
  for (let i = 0; i < iterationsPerFrame.value(); i++) {
    this.population.run();
    lifeP.html('frames: ' + count);
    genP.html('generation: ' + generation);

    var stoppedRockets = population.rockets.filter(rocket => {
      return rocket.crashed || rocket.completed;
    });

    var finishedRockets = population.rockets.filter(rocket => {
      return rocket.completed;
    });
    if (count == lifespan || population.rockets.length == stoppedRockets.length) {
      //population = new Population();
      population.evaluate();
      population.selection();
      count = 0;
      generation++;
    }
  }

  ellipse(target.x, target.y, 32, 32);
}