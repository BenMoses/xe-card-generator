//Background should just worry about snowing - simplest!
//NOT DONE:
//middleground should be stationary on the cards
//foreground should be stationary on the screen

function initSnow(element) { //element is the parentNode of the snow div
    var elObj = element.getBoundingClientRect();
    var canvas = document.createElement('canvas');
    canvas.id = "snowCanvas";
    canvas.width = elObj.width;
    canvas.height = elObj.height;
    canvas.style.position = "absolute";
    canvas.style.left = "0px";
    canvas.style.top = "0px";
    canvas.style.pointerEvents = "none";
    element.style.overflow = "hidden";

    element.insertBefore(canvas, element.firstElementChild.nextSibling); //insert in front of background

    var img = new Image();
    img.src = './snow_sprite.png';


    function generateSnowObj() {
        var maxWidth = window.innerWidth;
        var circle = {
            //size between 0 ->5
            radius: -1 + Math.ceil(Math.random() * 6),
            xVel: (-0.5 + (Math.random())) * 2,
            yVel: (-0.5 + (Math.random())) / 60,
            xPos: Math.random() * ((-0.1 * maxWidth) + (1.2 * maxWidth)),
            yPos: -20
        };
        return circle;
    }



    var backgroundEl = document.getElementById("snowCanvas");
    var bgContext = backgroundEl.getContext("2d");
    bgContext.canvas.width = window.innerWidth;
    bgContext.canvas.height = window.innerHeight;

    var fps = 60;
    var maxSnow = 200;
    var allSnow = [];
    for (j = 0; j < maxSnow; j++) {
        allSnow.push(generateSnowObj());
    }

    var wind = 0 / fps; //+ left to right //starts off as 1px per second
    var gravity = 50 / (7 * fps); //7 seconds to fall 7*60 fps
    var resistance = 0.05 / fps; // how much energy should be losts / removed 1pixel per 
    var snowflakes = 0;
    var terminalVel = 2;
    var div = 0;




    function snowLoop() {

        if (snowflakes < maxSnow) { //draw 1 new snowflake every 1/60 till no more snowflakes

            if (div % 4 == 0) {
                snowflakes++;
            }
            div++

        }

        bgContext.clearRect(0, 0, backgroundEl.width, backgroundEl.height); //clean

        //for each particle:
        for (i = 0; i < snowflakes; i++) {
            var currentFlake = allSnow[i];

            //horizontal behaviour:
            currentFlake.xVel += wind; //wind
            /*if(currentFlake.xVel > 0){
                currentFlake.xVel -= resistance;
                if(currentFlake.xVel < 0){
                    currentFlake.xVel = 0;
                }
            }*/

            /*if(currentFlake.xVel < 0){
                currentFlake.xVel += resistance;
                if(currentFlake.xVel > 0){
                    currentFlake.xVel = 0;
                }
            }*/

            //vertical behaviour:
            currentFlake.yVel -= resistance * 10; //resist
            currentFlake.yVel += gravity * (1 + currentFlake.radius); //grav
            if (currentFlake.yVel > terminalVel) { //term
                currentFlake.yVel = terminalVel;
            }


            if (currentFlake.xVel > 1.1) {
                currentFlake.xVel = 1.1;

            }


            currentFlake.xPos += currentFlake.xVel;
            currentFlake.yPos += currentFlake.yVel;

            if (currentFlake.yPos > bgContext.canvas.height) {
                currentFlake.yPos = -20;
            }

            //console.log(bgContext.canvas.width);

            if (currentFlake.xPos > bgContext.canvas.width) {
                currentFlake.xPos = -20;
            }
            /*
                    if(currentFlake.xPos < 20){
                        currentFlake.xPos = bgContext.canvas.width + 10;
                    }
              */

            /**
             * Sprit is 280 * 40, and includes 7 sprites, so each one is 40*40 and positioned at n-1 * 40 - x and 0 y
             */

            var spriteWidth = 40, spriteHeight = 40, pixelsLeft = 40 * currentFlake.radius, pixelsTop = 0;
            bgContext.drawImage(img, pixelsLeft, pixelsTop, spriteWidth, spriteHeight, currentFlake.xPos, currentFlake.yPos, spriteWidth, spriteHeight);
        }


    };

    var interval = setInterval(snowLoop, 1000 / 60);

    function stopSnow() {
        clearInterval(interval);
        canvas.remove();
    }


    return stopSnow;
};

