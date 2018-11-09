//Background should just worry about snowing - simplest!

//middleground should be stationary on the cards

//foreground should be stationary on the screen


var allSnow = [];
var backgroundEl = document.getElementById("effect-background");
var bgContext = backgroundEl.getContext("2d");

bgContext.canvas.width = window.innerWidth;
bgContext.canvas.height = window.innerHeight;
var maxSnow = 100;

for (j = 0; j < maxSnow; j++) {
    allSnow.push(generateSnowObj());
}

var wind = 0;
var skip = 0;
var gravity = 0.1;
var resistance = 0.05;
var snowflakes = 0;
function initSnow() {

  if(snowflakes < maxSnow){
    snowflakes++;
  }
  
    bgContext.clearRect(0, 0, backgroundEl.width, backgroundEl.height); //clean

    for (i = 0; i < snowflakes; i++) {
        var current = allSnow[i];
      
      current.Yv -= resistance;
      current.Xv -= resistance;

        current.Yv += gravity;

        if (current.Yv > 3) {
            current.Yv = 3;
        }
      if(allSnow[i].Ypos > window.innerHeight){
        allSnow[i] = generateSnowObj();
      }
        
        current.Ypos += current.Yv;
        /**
         * Sprit is 280 * 40, and includes 7 sprites, so each one is 40*40 and positioned at n-1 * 40 - x and 0 y
         */
        var img = new Image();
        img.src = './snow_sprite.png';
        
        var spriteWidth  = 40,
            spriteHeight = 40,
            pixelsLeft   = 40 * current.radius,
            pixelsTop    = 0,
        
            // Where are we going to draw
            // the sprite on the canvas
            canvasPosX   = current.Xpos,
            canvasPosY   = current.Ypos

            console.log(pixelsLeft)
            bgContext.drawImage(img,            pixelsLeft,            pixelsTop,            spriteWidth,            spriteHeight,            canvasPosX,            canvasPosY,
            spriteWidth,
            spriteHeight
        );
        //bgContext.filter = "blur(3px)";
        /*bgContext.beginPath();
        bgContext.arc(current.Xpos, current.Ypos, current.radius / 2, 0, 2 * Math.PI, false);
        bgContext.fillStyle = '#ffffff';
        bgContext.fill();
            */
    }
}


function generateSnowObj() {
    var maxWidth = window.innerWidth;
    var circle = {
        //size between 8 ->14
        radius: -1 + Math.ceil(Math.random() *9),
        Xv:  -5 + (Math.random()*10),
        Yv: -5 + (Math.random()*10),
        //rand * min + max
        Xpos: Math.random() * ((-0.1 * maxWidth) + (1.2 * maxWidth)),
        Ypos: -20,
        isStationary: false
    };
    return circle;
}

setInterval(initSnow, 1000 / 60);
