function onWindowLoad() {
    createWindow(640, 480);
    for (var i = 0; i < 100; i++) {
        addInstance(new Ball());
    }
    drawSetBackground(10);
    drawSetStroke(255);
    drawSetLineWidth(2);
    drawSetColorMode(COLOR_MODES.HSL);
}

class Ball {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speed = vectorCreateRandom();
        this.color = mod(this.x, 1) * 360;
        this.speed.setMag(2);
        
    }

    onDraw() {
        this.x = mod(this.x + this.speed.x, width);
        this.y = mod(this.y + this.speed.y, height);
        drawSetFill(this.color);
        drawCircle(this.x, this.y, 10);
    }
}