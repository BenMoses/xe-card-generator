module.exports.generateInputPage = function generateInputPage(backgroundFiles, cardFiles){
/**
 * How to checked the first el ${checked ? (checked = !checked , "checked") : ""}
 */

    function editor(){

    }

    function effectStyle(){ 
        return `
        <style>
            #effect-background, #effect-content, #effect-foreground {
                width: 100%;
                height:100%;
                position:absolute;
                left:0px;
                top:0px;
            };
        </style>`
    }
    function effectScript(){



        return `
        <script>
            var backgroundCanvas = document.getElementById("effect-background");
            var bgCanvas = canvas.getContext("2d");
            bgCanvas.fillStyle = "#FF0000";
            bgCanvas.fillRect(0, 0, 80, 80);
        </script>`
    }


    function backgroundsLoop() {
        var html = "";
        var cleanString;
        var checked = "checked";
        for (i = 0; i < backgroundFiles.length; i++) {
            cleanString = backgroundFiles[i].replace('.jpg', "").replace('.png', "").replace("_", " ").replace("-", " ");
            //Capitalise the first letter
            cappedString = cleanString.substr(0, 1).toUpperCase() + cleanString.substr(1);
            html += `   <input type="radio" name="background" value="${backgroundFiles[i]}" id="${backgroundFiles[i]}">
                        <label for="${backgroundFiles[i]}" class="bg">    
                        <div class="bg-images" style="background-image:url(${backgroundFiles[i]})"></div>    
                        <p class="bg-text">${cappedString}</p> 
                        </label>`;
            
            
            if(checked == true);
        }

        return html;
    }


    function cardsLoop() {
        var html = "";
        var cleanString;
        var checked = "checked";
        for (i = 0; i < cardFiles.length; i++) {
            if(cardFiles[i].indexOf('cover') > -1){
                //remove any illegal, or unwanted string from the title                
                cleanString = cardFiles[i].replace("_cover", "").replace('.jpg', "").replace('.png', "").replace("_", " ").replace("-", " ");
                //Capitalise the first letter
                cappedString = cleanString.substr(0, 1).toUpperCase() + cleanString.substr(1);
                html += `   <input type="radio" name="card" value="${cardFiles[i]}" id="${cardFiles[i]}"> 
                            <label for="${cardFiles[i]}" class="bg">    
                                <div class="card-images" style="background-image:url(${cardFiles[i]})"></div>    
                                <p class="bg-text">${cappedString}</p> 
                            </label>`;
            }
        }


        return html;
    }


// now return the html with the dynamic content
 return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Xara Cloud's Input page</title>
<link rel="stylesheet" type="text/css" href="./input.css">
${effectStyle()}
</head>

<body> 

    <div id="cardPreview">
        <img id="actualCardPreview-inside-right"></img>
        <canvas id="effect-background"></canvas>
                        <!--
                        <div id="editor">
                            <textArea id="textEditor">
                            I would just like to say thank you all for a fantastic year, and we look forward to a better one next year!

                                    Boss,                        www.example.com
                                                        
                            </textArea>
                            <p id="signature">undefined</p>
                            <img id="logoEditor" src=""></img>
                        </div>
                        -->
        <img id="actualCardPreview-inside-left"></img>
        <canvas id="effect-content"></canvas>
        <img id="actualCardPreview-cover"></img>
        <canvas id="effect-foreground"></canvas>
    </div>
    
    
    <div id="header">
        <h1 class="" id="backgroundInstructions" onclick="goToStep( 'background' )">Choose your E-card's Background:</h1>
        <h1 class="hidden" id="cardInstructions" onclick="goToStep( 'card' )">Choose your card design:</h1>
        <h1 class="hidden" id="infoInstructions">Include your message:</h1>
        <a href="https://www.xara.com">
            <div id="madeby">
                <div >Made by the guys at </div>
                <div id="xara-logo"></div>
            </div>
        </a>
    </div>

    <div class="button" id="toInfo" onclick="goToStep( 'info' )">Add your message...</div>
    <div class="button" id="toCards" onclick="goToStep( 'card' )">Choose a card design...</div>


    



    <form id="createCardForm" <!--action="fileupload" method="post"--> enctype="multipart/form-data">

<!-- information -->
    <div class="hidden" id="form">

        <label id="addComp" for="imgupload">Click to add your company logo
            </label>
            <input id="imgupload" type="file" name="filetoupload">
        <img id="preview" src="">

        
        <label id="emailLabel">Add your email address:</label><br>
        <input id="emailInput" type="text" name="email" value="" required><br><br>

        
        <label id="compLabel">Your companies URL:</label><br>
        <input id="compInput" type="text" name="company" value="www.example.com"><br><br>

        <label id="messageLabel">Your message:</label><br>
        <textarea id="message" name="message" rows="10" cols="30">I would just like to say thank you all for a fantastic year, and we look forward to a better one next year!

                Boss,                        www.example.com
                                    
        </textarea><br><br>
        
        <label id="contactLabel">
        <input id="contactCheck" type="checkbox" name="contact" checked>
        Yes I would like to hear about more stuff from <a href="https://www.xara.com">Xara Cloud</a>
    </label>

    </div>
        
        <div class="button hidden" id="toSubmit" onclick="sendForm()">Get your e-card</div>

<!-- card -->
            <div class="hidden" id="card-picker">
                ${cardsLoop()}
            </div>


<!-- background -->
<div class="" id="background-picker">
    ${backgroundsLoop()}
</div>

    
    </form>


    <div id="cover"></div>
    <div id="sharePanel">
        <div id="closeShare">x</div>
        <h2>Share your e-card</h2>
        <p id="publishedTo">Your e-card is published to here:</p>
        <p id="cardURL">UNDEFINED</p>
        <hr>
        <p id="shareTo">Share to: not yet supported</p>
        <div id="facebook"></div><div id="twitter"></div>
        
        <hr>
        <p id="emailTo">EMAIL: not yet supported</p>


    </div>

    ${effectScript()}
    <script src="input.js"></script>
</body>
</html>`

}