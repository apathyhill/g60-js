/*
==================
 GLOBAL VARIABLES
==================
*/

// Canvas Settings
canvas = null;
ctx = null;
width = null;
height = null;

// Drawing Settings
const COLOR_MODES = Object.freeze({"RGB": 0, "HSL": 1});
colorMode = COLOR_MODES.RGB;
fillEnabled = false;
strokeEnabled = false;

// Engine Variables
instances = [];

/*
===================
 GENERAL SETUP 
===================
*/

window.addEventListener('load', (event) => {
    onWindowLoad();
});

function createWindow(w, h) {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    width = w;
    height = h;
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);

    window.requestAnimationFrame(eventLoop);
}

function eventLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var inst of this.instances) {
        if (typeof inst.onDraw === "function") {
            inst.onDraw();
        }
    }
    window.requestAnimationFrame(this.eventLoop.bind(this));
}

function addInstance(inst) {
    instances.push(inst);
}

/*
===================
 DRAWING FUNCTIONS 
===================
*/

function drawSetColorMode(mode) {
    colorMode = mode;
}

function drawGetColor(x, y=null, z=null, w=1) {
    if (typeof x === "string") { return x; }
    switch (colorMode) {
        case COLOR_MODES.RGB:
            if (z === null) { // Grayscale mode
                if (y !== null) { // Set opacity if not null
                    w = y;
                }
                y = x; // Set green and blue to red value
                z = x;
            }
            return "rgb(" + x + "," + y + "," + z +  "," + w + ")";
            break;
        case COLOR_MODES.HSL:
            if (z === null) { // Pure hue mode
                if (y !== null) { // Set opacity if not null
                    w = y;
                }
                y = 100; // Set saturation and lightness to full
                z = 50;
            }
            return "hsl(" + x + "," + y + "%," + z +  "%," + w + ")";
            break;
    }
}

function drawSetBackground(x, y=null, z=null, w=1) {
    var color = drawGetColor(x, y, z, w);
    canvas.style = "background-color: " + color;
}

function drawSetFill(x, y=null, z=null, w=1) {
    var color = drawGetColor(x, y, z, w);
    ctx.fillStyle = color;
    fillEnabled = true;
}

function drawSetStroke(x, y=null, z=null, w=1) {
    var color = drawGetColor(x, y, z, w);
    ctx.strokeStyle = color;
    fillEnabled = true;
}

function fillOff() {
    fillEnabled = false;
}

function strokeOff() {
    strokeEnabled = false;
}

function drawSetLineWidth(w) {
    if (w == 0) { strokeOff(); }
    else { ctx.lineWidth = w; }
}

function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    if (fillEnabled) { ctx.fill(); }
    if (strokeEnabled) { ctx.stroke(); }
}

function drawRect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    if (fillEnabled) { ctx.fill(); }
    if (strokeEnabled) { ctx.stroke(); }
}

/*
================
 MATH FUNCTIONS 
================
*/

class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    setMag(mag) {
        this.unit();
        this.x *= mag;
        this.y *= mag;
    }

    getMag(mag) {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    
    unit() {
        var mag = this.getMag();
        this.x = this.x * (1 / mag);
        this.y = this.y * (1 / mag);
    }

} 

function vectorCreateRandom() {
    var dir = Math.random() * 2 * Math.PI;
    return new Vector2D(Math.cos(dir), Math.sin(dir));
}

function mod(n, m) {
    return ((n % m) + m) % m;
}