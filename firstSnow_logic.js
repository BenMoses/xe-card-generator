var allSnow = [];
var backgroundEl = document.getElementById("effect-background");
var bgContext = backgroundEl.getContext("2d");

bgContext.canvas.width = window.innerWidth;
bgContext.canvas.height = window.innerHeight;

for (j = 0; j < 50; j++) {

    allSnow.push(generateSnowObj());
}

var wind = 0;
var skip = 0;
var gravity = 1;
var snowflakes = 0;
function initSnow() {

    if (snowflakes < 50) {
        if (skip > 15) {
            snowflakes++;
            skip = 0;
        }
        skip++;
        //console.log(snowflakes)
    }

    bgContext.clearRect(0, 0, backgroundEl.width, backgroundEl.height); //clean

    for (i = 0; i < snowflakes; i++) {
        var current = allSnow[i];
        current.Yv += gravity;

        if (current.Yv > 5) {
            current.Yv = 5;
        }
        current.Ypos += current.Yv

        bgContext.filter = "blur(3px)";
        bgContext.beginPath();
        bgContext.arc(current.Xpos, current.Ypos, current.radius / 2, 0, 2 * Math.PI, false);
        bgContext.fillStyle = '#ffffff';
        bgContext.fill();
    }
}


function generateSnowObj() {
    var maxWidth = window.innerWidth;
    var circle = {
        //size between 8 ->14
        radius: 3 + Math.ceil((Math.random() * 11)),
        Xv: 0,
        Yv: 0,
        //rand * min + max
        Xpos: Math.random() * ((-0.1 * maxWidth) + (1.2 * maxWidth)),
        Ypos: 0,
        isStationary: false
    };
    return circle;
}

setInterval(initSnow, 1000 / 120);
