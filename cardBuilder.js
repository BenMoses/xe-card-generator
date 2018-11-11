
//card2Gen(background, card, relativePath, message, signature, isSnowing);
module.exports.card2Gen = function card2Gen(background, card, relativePath, message, signature, isSnowing, exportURL){

    this.background = background
    this.cover = "../" + card;
    this.insideLeft = this.cover.replace('_cover', "_inside_left");
    this.insideRight = this.cover.replace('_cover', "_inside_right");
    this.message = message;
    this.signature = signature;
    //this.url = company;
    this.logo = relativePath || "";
    

    this.fbOpenGraph = `
    <meta property="og:url"                content="${exportURL}" />
    <meta property="og:type"               content="website" />
    <meta property="og:title"              content="My E-card" />
    <meta property="og:description"        content="${this.message}" />
    <meta property="og:image"              content="${exportURL + this.cover}" />
    `;

    this.style = `

    body {
        position:absolute;
        left:0px;
        top:0px;
        width:100%;
        height: 100%;
        margin: 0;
        overflow:hidden;
    }
    #background {
        position:absolute;
        left:0px;
        top:0px;
        width:100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        margin: 0;

    }

    #actualCardPreview-cover, #actualCardPreview-inside-left, #actualCardPreview-inside-right {
        position:absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        margin: auto;
        height: 75%;
        transition: all 1s;
        transform-origin: top left;
        backface-visibility: hidden;
    }

        
    #actualCardPreview-cover.open {
        transform : translateX(50%) rotateY(180deg) !important;

    }

    #actualCardPreview-inside-left {
        transform : translateX(-100%) rotateY(180deg);
        transform-origin: top right;
    }
    #actualCardPreview-inside-left.open {
        transform: translateX(calc(-50% + 1px)) rotateY(360deg);
        border-right: 1px solid rgba(0,0,0,0.3);

    }
    #actualCardPreview-inside-right.open {
        transform: translateX(calc(50% - 1px));
    
    }



    #insideCard {
        position:absolute;
        left:0px;
        bottom:0px;
        right:0px;
        top:0px;
        margin:auto;
        height: 75%;
        transition: transform 1s;
        opacity: 0;
    }
    
    #insideCard.open {
        transform: translateX(calc(50% - 1px));
    }
    
    #insideCard h4, #insideCard h5{
        font-family: 'Mountains of Christmas', cursive;
        font-size: 96px;
        height: 42%;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        margin: 5%;
        margin-top: 10%;
        color: #b01c29;
        text-align: center;
    }
    #insideCard h5{
        font-size: 36px;
        height: 15%;
        bottom: calc(5% + 100px);
        position: absolute;
        width:90%;
        margin-bottom: 0px;
        margin-top:0px;
    }
    
    
    #insideCard img{
        height: 100px;
        width: auto;
        max-width: 100%;
        bottom: 5%;
        position: absolute;
        left: 0px;
        right: 0px;
        margin: auto;
        /*display:none;*/
    }
    `;

    this.script = `
        var openCard = true;
        function toggleCard(){
        if(openCard){
            document.querySelector('#actualCardPreview-cover').classList.add("open");
            document.querySelector('#actualCardPreview-inside-left').classList.add("open");
            document.querySelector('#actualCardPreview-inside-right').classList.add("open");
            document.querySelector('#insideCard').classList.add("open");
            document.querySelector('#insideCard').style.opacity = 1 ;
            autofit(document.querySelector('h4'));
            autofit(document.querySelector('h5'));
        }else{
            document.querySelector('#actualCardPreview-cover').classList.remove("open");
            document.querySelector('#actualCardPreview-inside-left').classList.remove("open");
            document.querySelector('#actualCardPreview-inside-right').classList.remove("open");
            document.querySelector('#insideCard').classList.remove("open");
        }
        openCard = !openCard;
    };`

    this.runScripts = `
    <script src="snow.js"> </script>
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
             var size = parseInt(getComputedStyle(element).fontSize); //cache size
 
             //increase till it is overflowing
             while (!isOverflown(element)) {
                 element.style.fontSize = (size++) + "px";
             }
 
             //decrease until it isn't overflowing
             while (isOverflown(element)) {
                 element.style.fontSize = (size--) + "px";
             };
         }
         
         isOverflown = function (element) {
            return element.scrollHeight > element.clientHeight; //|| element.scrollWidth > element.clientWidth;
        }
 
         window.addEventListener('resize', function(){
             autofit(document.querySelector('h4'));
             autofit(document.querySelector('h5'));
         })
         
         autofit(document.querySelector('h4'));
         autofit(document.querySelector('h5'));
 
     </script>

     <script>
     
        var cardState = false;
        document.querySelector('#actualCardPreview-inside-left').addEventListener('mousedown', function(ev){ 
            ev.preventDefault();
            toggleCard(cardState)
            cardState = !cardState;
        });
        
        document.querySelector('#actualCardPreview-cover').addEventListener('mousedown', function(ev){ 
            ev.preventDefault();
            toggleCard(cardState)
            cardState = !cardState;
        });
     

     </script>

     ${isSnowing ? "<script> initSnow(document.querySelector('body')); </script>" : ""}


`


    return `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <title>Xara Cloud's Input page</title>
        <style>
        ${this.style}
        </style>
        
        <script>
        ${this.script}
        </script>
        <link href="https://fonts.googleapis.com/css?family=Mountains+of+Christmas" rel="stylesheet">
        ${this.fbOpenGraph};
        </head>
        
        <body>
        <div id="background" style="background-image: url(${background});"></div>
 
        <img id="actualCardPreview-inside-right" src="${this.insideRight}">

        <div id="insideCard">
            <h4 style="font-size: 48px;">${this.message}
            </h4>
            <h5 style="font-size: 31px;">${this.signature}</h5>
                ${relativePath ? "<img id='logoPreview' src="+relativePath+">" : ""}    
        </div>


        <img id="actualCardPreview-inside-left" src="${this.insideLeft}">
        <img id="actualCardPreview-cover" src=${this.cover}>

        </div>
        ${this.runScripts}
        </body>
        </html>`

}