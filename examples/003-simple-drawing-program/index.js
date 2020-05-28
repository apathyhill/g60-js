function onWindowLoad() {
    createWindow(640, 480);
    addInstance(new Drawing());
    refreshOff();
    fillOff();
    drawSetBackground(31);
    drawSetStroke(191);
    drawSetLineWidth(3);
}

class Drawing {
    constructor() {
        this.colors = ["white", "red", "yellow", "green", "cyan", "blue", "purple"];
        this.index = 0;
        this.eraser = false;
    }

    onDraw() {
        if (isKeyPressed()) {
            switch (keyLast) {
                case "E":
                case "e":
                    this.eraser = !this.eraser;
                    break;
                case "C":
                case "c":
                    clearScreen();
                    break;
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                    this.index = parseInt(keyLast)-1;
                    break;
            }
        }
    }
    onMousePress() {
        if (this.eraser) {
            for (var i = 0; i < 1; i+=0.01) { // Rudimentary way of erasing a line
                var x = lerp(mouseX, mouseXPrev, i);
                var y = lerp(mouseY, mouseYPrev, i);
                eraseCircle(x, y, 10);
            }
        } else {
            drawSetStroke(this.colors[this.index]);
            drawLine(mouseX, mouseY, mouseXPrev, mouseYPrev);
        }
    }
}