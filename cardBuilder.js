

module.exports.card2Gen = function card2Gen(background, card, relativePath, message, company) {

    this.background = background
    this.cover = "../" + card;
    this.insideLeft = this.cover.replace('_cover', "_inside_left");
    this.insideRight = this.cover.replace('_cover', "_inside_right");
    this.text = message;
    this.url = company;
    this.logo = relativePath;

    this.style = `

    body {
        user-select : none;
    }

    #background {
        position: absolute;
        left: 0px;
        top: 0px;
        height: 100%;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
    }

    #cover {
        position: absolute;
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
    
    #actualCardPreview-inside-left{
        transform-origin: top right;
        transform: translateX(calc(-100% + 1px)) rotateY(180deg);
    
    
    }
    
    #actualCardPreview-cover.open {
        transform : translateX(50%) rotateY(180deg) !important;
    
    }
    
    #actualCardPreview-inside-left.open {
        transform: translateX(calc(-50% + 1px)) rotateY(360deg);
        border-right: 1px solid rgba(0,0,0,0.3);
    
    }
    
    #actualCardPreview-inside-right.open {
        transform: translateX(calc(50% - 1px));
    
    }

    #text{
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        margin: auto;
        height: 60vh;
        width: 60vh;
        transition: all 1s;
        transform-origin: top left;
        backface-visibility: hidden;
        font-family: 'Mountains of Christmas', cursive;
        pointer-events: none;
        font-size: 3.5vh;
    }

    #text.open {
        transform: translateX(37.5vh);
    }

    #logo {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 400px;
        margin: auto;
        width: 20vh;
        transition: all 1s;
        transform-origin: top left;
        backface-visibility: hidden;
        font-family: 'Mountains of Christmas', cursive;
        pointer-events: none;
        font-size: 3.5vh;
        /* text-align: right; */
        transform: translateY(25vh);
    }
    #logo.open {
        transform: translateX(37.5vh) translateY(25vh);

    }

    #company {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        margin: auto;
        height: 60vh;
        width: 60vh;
        transition: all 1s;
        transform-origin: top left;
        backface-visibility: hidden;
        font-family: 'Mountains of Christmas', cursive;
        pointer-events: none;
        font-size: 3.5vh;
        text-align: right;
        transform: translateY(45vh);
    }

    #company.open{
        transform: translateX(37.5vh) translateY(45vh);

    }

    `;

    this.script = `
        var openCard = true;
        function toggleCard(){
        if(openCard){
            document.querySelector('#actualCardPreview-cover').classList.add("open");
            document.querySelector('#actualCardPreview-inside-left').classList.add("open");
            document.querySelector('#actualCardPreview-inside-right').classList.add("open");
            document.querySelector('#text').classList.add("open");
            document.querySelector('#logo').classList.add("open");
            document.querySelector('#company').classList.add("open");
        }else{
            document.querySelector('#actualCardPreview-cover').classList.remove("open");
            document.querySelector('#actualCardPreview-inside-left').classList.remove("open");
            document.querySelector('#actualCardPreview-inside-right').classList.remove("open");
            document.querySelector('#text').classList.remove("open");
            document.querySelector('#logo').classList.remove("open");
            document.querySelector('#company').classList.remove("open");
        }
        openCard = !openCard;
    }
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
        </head>
        
        <body > 
        
        <div id="background"style="background-image:url(${this.background})"></div>
            <div id="cardPreview">

                <img id="actualCardPreview-inside-right" src="${this.insideRight}" onclick="toggleCard()">
                <div id="text">${this.text}</div>
                <img id="logo" src="${this.logo}"></img>
                <div id="company">${this.company}</div>


                <img id="actualCardPreview-inside-left" src="${this.insideLeft}" onclick="toggleCard()"></img>
                <img id="actualCardPreview-cover" src="${this.cover}" onclick="toggleCard()"></img>
            </div>
            


            
        </body>
        </html>`

}