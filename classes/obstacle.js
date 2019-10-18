class Obstacle {
    x;
    y;
    width;
    height;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw = function () {
        rectMode(CORNER)
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }
}