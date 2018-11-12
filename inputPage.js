module.exports.generateInputPage = function generateInputPage(backgroundFiles, cardFiles){
/**
 * How to checked the first el ${checked ? (checked = !checked , "checked") : ""}
 */

    function editor(){

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
 return `
 <!DOCTYPE html>
 <html>
 
 <head>
     <meta charset="UTF-8">
     <title>Xara Cloud's Input page</title>
     <link rel="stylesheet" type="text/css" href="./input.css">
     <link href="https://fonts.googleapis.com/css?family=Mountains+of+Christmas" rel="stylesheet">
     <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
 </head>
 
 <body>
 
     <div id="cardPreview">
        <div><!-- This div acts as a the first child for the snow to be in front of --></div>
         <img id="actualCardPreview-inside-right"></img>
         <div id="insideCard">
             <h4 contentEditable>Click here to edit your message.
             </h4>
             <h5 contentEditable>and don't forget to sign it!</h4>
                 <img id="logoPreview"src="./removeLogo.png"></img>
         </div>
 
 
         <img id="actualCardPreview-inside-left"></img>
         <img id="actualCardPreview-cover"></img>
 
     </div>
 
 
     <div id="header">
         </h1>
         <h1 class="" id="backgroundInstructions">Firstly choose your E-card’s background:
         </h1>
         <h1 class="hidden" id="cardInstructions">Pick a card design</h1>
         <h1 class="" id="backButton">Back
     </div>
 
     <div class="button disabled" id="toInfo" onclick="goToStep( 'info' )">Next, add your message</div>
     <div class="button disabled" id="toCards" onclick="goToStep( 'card' )">Choose a card design...</div>
 
 
 
 
 
 
     <form id="createCardForm" <!--action="fileupload" method="post" --> enctype="multipart/form-data" autocomplete="off">
 
         <!-- information -->
         <div class="hidden" id="form">
 
             <label id="addComp" for="imgupload">Click to add your company logo <i>(optional)</i>
             </label>
             <input id="imgupload" type="file" name="filetoupload">
             <img id="preview" src="">
 
 
             <label id="emailLabel">Add your email address: <i>(required)</i></label>
             <input id="emailInput" type="text" name="email" value="" required>
 
 <!--
             <label id="compLabel">Your companies URL:</label>
             <input id="compInput" type="text" name="company" value="www.example.com">
 -->
             <label id="contactLabel">
                 <input id="contactCheck" type="checkbox" name="contact" checked> Yes I would like to hear about more stuff from
                 <a href="https://www.xara.com">Xara Cloud</a>
             </label>
 
         </div>
 
         <div class="button hidden" id="toSubmit" onclick="sendForm()">Get your e-card</div>
 
         <!-- card -->
         <div class="overflowHandler">
         <div class="hidden" id="card-picker">
                
              ${cardsLoop()}
         </div>
         </div>
 
 
         <!-- background -->
         <div class="overflowHandler">
         <div class="" id="background-picker">
            
         ${backgroundsLoop()}
         </div>
         </div>
 
 
     </form>
 
 
     <div id="cover"></div>
     <div id="sharePanel">
         <div id="closeShare">x</div>
         <h2>Share your e-card</h2>
         <p id="publishedTo">Your e-card is published to here:</p>
         <p id="cardURL">UNDEFINED</p>
         <hr>
         <p id="shareTo">
            Share to: 
         </p>
         
         <a><div id="facebook" class="social" title="Share to Facebook!"></div> </a>
         <a><div id="twitter" class="social" title="Share to Twitter!"></div> </a>
         <a><div id="linkedin" class="social" title="Share to LinkedIn!"></div> </a>
         <a><div id="pinterest" class="social" title="Share to Pinterest!"></div> </a>
 
         <hr>
         <p id="emailTo">Email:</p>
         <form id="sendEmailForm">
            <input class="shareForm email" type="email" name="email1" placeholder="#1 Email">
            <input class="shareForm name" type="text" name="name1" placeholder="#1 Name"><br>

            <input class="shareForm email" type="email" name="email2" placeholder="#2 Email">
            <input class="shareForm name" type="text" name="name2" placeholder="#2 Name"><br>

            <input class="shareForm email" type="email" name="email3" placeholder="#3 Email">
            <input class="shareForm name" type="text" name="name3" placeholder="#3 Name"><br>

            <input class="shareForm email" type="email" name="email4" placeholder="#4 Email">
            <input class="shareForm name" type="text" name="name4" placeholder="#4 Name"><br>

            <input class="shareForm email" type="email" name="email5" placeholder="#5 Email">
            <input class="shareForm name" type="text" name="name5" placeholder="#5 Name"><br>

            <p id="emailText">Currently we only allow you to share to 5 emails at once. You could share via social media or using the Link. <br> We will change the email name to be the names you entered.</p>            
            <div id="sendEmailButton" onclick="sendEmails()">Send</div>
        </form>
 
 
     </div>
     
     <div id="welcomePanel">
         <h1>Create and send your own E-card
         </h1>
         <img id="cardCover" src="./intro_card_cover.png">    
 
         </img>
         <div class="button" id="coverButton">Show some love</div>
     </div>
 
 
 
 
     <a href="https://www.xara.com"><div id="xara-logo"></div>
     </a>
 
     <footer>
        <p><a href="https://www.xara.com/" target="_blank">Create your own design</a>   |   <a href="https://www.xara.com/" target="_blank">Tell a friend</a>   |   <a href="https://www.xara.com/" target="_blank">Signup to our newsletter</a></p>
        <p id="made">… made by the team at <a href="https://www.xara.com" target="_blank"><b>xara.com</b></a></p>
         </footer>
     <!--SCRIPTS -->
 
     <script src="input.js"></script>
     <script src="snow.js"></script>
     <script>
         function updateCardContent() {
             var cardContent = document.querySelector('#insideCard');
             cardContent.style.width = "" + cardContent.getBoundingClientRect().height + "px";
         }
         updateCardContent();
         window.addEventListener('resize', updateCardContent)
     </script>
 
     <script>
 
 
         function autofit(element) {
             if(element.innerText == ""){
                 //if there is no text, exit immediately
                 return;
             }

             element.innerText == element.innerText;
             
             var size = parseInt(getComputedStyle(element).fontSize); //cache size
 
             //increase till it is overflowing
             var adjust = 0;
             while (!isOverflown(element) && adjust < 100) {
                 element.style.fontSize = (size++) + "px";
                 element.style.display = 'none';
                 element.style.display = 'block';
                 adjust++;
             }
 
             //decrease until it isn't overflowing
             while (isOverflown(element) && adjust < 100) {
                 element.style.fontSize = (size--) + "px";
                 element.style.display = 'none';
                 element.style.display = 'block';
                 adjust++;
             };
         }
 
         function initAutofit(element) {
 
 
             isOverflown = function (element) {
                 return element.scrollHeight > element.clientHeight; //|| element.scrollWidth > element.clientWidth;
             }
 
 
 
             //change string identifier to object
             if (typeof element != "object") {
                 element = document.querySelector(element);
             }
 
             element.addEventListener("paste", function (ev) { 
                 ev.preventDefault();
             });

             element.addEventListener("input", function () { autofit(element)});
         };
 
         initAutofit('h4');
         initAutofit('h5');
 
         window.addEventListener('resize', function(){
             autofit(document.querySelector('h4'));
             autofit(document.querySelector('h5'));
         })
         
         autofit(document.querySelector('h4'));
         autofit(document.querySelector('h5'));
 
     </script>
 </body>
 
 </html>`

}