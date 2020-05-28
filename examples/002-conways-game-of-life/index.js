function onWindowLoad() {
    createWindow(640, 480);
    addInstance(new CGOL());
    drawSetBackground("green");
    drawSetFill("black");
}

class CGOL {
    constructor() {
        this.cellSize = 20;
        this.rows = height / this.cellSize;
        this.cols = width / this.cellSize;
        this.array = new Array(this.rows * this.cols).fill(false);
        this.arrayNext = new Array(this.rows * this.cols).fill(false);
        for (var i = 0; i < this.array.length; i++) { this.array[i] = Math.random() > 0.5; }
        this.timer = 0;
    }

    onDraw() {
        this.timer += 1;
        if (mod(this.timer, 5) == 0) { // Limit FPS to 12
            this.timer = 0;

            var index = null;
            var neighbors = null;

            this.arrayNext.fill(false);
            for (var x = 0; x < this.cols; x++) {
                for (var y = 0; y < this.rows; y++) {
                    neighbors = this.checkNeighbors(x, y);
                    index = (y * this.cols) + x;
                    if (this.array[index]) {
                        // Keep alive if 2 or 3 neighbors, otherwise kill
                        if (neighbors < 2 || neighbors > 3) { this.arrayNext[index] = false; } 
                        else { this.arrayNext[index] = true; }
                    } else {
                        // Spawn if exactly 3 neighbors
                        if (neighbors == 3) { this.arrayNext[index] = true; }
                    }
                }
            }
            this.array = this.arrayNext.slice();
        }

        for (var i = 0; i < this.array.length; i++) {
            var x = mod(i, this.cols) * this.cellSize;
            var y = Math.floor(i / this.cols) * this.cellSize;
            if (this.array[i]) {
                drawRect(x, y, this.cellSize, this.cellSize);
            }
        }
    }

    checkNeighbors(x, y) {
        var n = 0;
        var index = null;
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (!(i == 0 && j == 0)) {
                    index = (mod(y + j, this.rows) * this.cols) + mod(x + i, this.cols);
                    n += this.array[index];
                }
            }
        }
        return n;
    }
}