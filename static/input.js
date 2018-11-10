var bgs = document.querySelectorAll('.bg-images');

bgs.forEach(x => {
    x.addEventListener('click', moveToCenter.bind( { cont: document.querySelector('#background-picker') , el: x } ))
})


/* to use for cards
var cards = document.querySelectorAll('.card-images');
cards.forEach(x => {
    x.addEventListener('click', moveToCenter.bind( { cont: document.querySelector('#card-picker') , el: x } ))
})
*/





function moveToCenter(){
    var container = this.cont.getBoundingClientRect(); //dimensions for wrapper

    var el = this.el; //element to be centered
    var size = el.getBoundingClientRect();
    var max = container.width - window.innerWidth + 50;

    var wantedLeft = (window.innerWidth /2) - (size.width /2);
    var current = container.left;

    var diff = size.left - wantedLeft; //diff between its current pos and wantedPos

    var setValue = current-diff;
    if(setValue > 0){
        setValue = 0;
    }

    if(setValue < -max){
        setValue = -max;
    }


    this.cont.style.left = `${setValue}px`;
};

var goto = "background";
var hasSelectedCard = false;
function goToStep(option){
    
    document.getElementById("backButton").addEventListener('click', function(){goToStep(goto)});

    switch(option){
        case "background":
        //show bg
        document.querySelector('#backgroundInstructions').classList = '';
        document.querySelector('#background-picker').classList = '';
        document.querySelector('#toCards').classList = 'button';
        
        //hide cards
        document.querySelector('#cardInstructions').classList = 'hidden';
        document.querySelector('#card-picker').classList = 'hidden';

        //hide info
        document.querySelector('#toSubmit').classList = "";
        document.querySelector('#form').classList = "hidden";

        //close card
        toggleCard(false);

        //back button
        document.querySelector('#backButton').style.opacity = 0;


        break;
        case "card":
        //hide bg
        document.querySelector('#backgroundInstructions').classList = 'inactive';
        document.querySelector('#background-picker').classList = 'hidden';
        document.querySelector('#toCards').classList = 'hidden';
        
        //show cards
        document.querySelector('#cardInstructions').classList = '';
        document.querySelector('#card-picker').classList = '';
        document.querySelector('#toInfo').classList = 'button';
        if( !hasSelectedCard ){
            document.querySelector('#toInfo').classList.add('disabled');
        }
        //hide info
        
        document.querySelector('#toSubmit').classList = "";
        document.querySelector('#form').classList = "hidden";

        //close card
        toggleCard(false);

        //backbutton 
        document.querySelector('#backButton').style.opacity = 0.49;
        var goto = "background";
        

        break;
        case "info":
        //hide bg
        document.querySelector('#backgroundInstructions').classList = 'inactive';
        document.querySelector('#background-picker').classList = 'hidden';
        document.querySelector('#toCards').classList = 'hidden';

        //hide card
        document.querySelector('#cardInstructions').classList = 'inactive';
        document.querySelector('#card-picker').classList = 'hidden';
        document.querySelector('#toInfo').classList = 'hidden';

        //show info
        document.querySelector('#toSubmit').classList = "button";
        document.querySelector('#form').classList = "";
        document.querySelector('#insideCard').style.opacity = 1;//first time going to the info, make the inside card visible;

        //open card
        toggleCard(true);

        
        //backbutton 
        document.querySelector('#backButton').style.opacity = 0.49;
        var goto = "card";
        break;
    }
}


function toggleCard(bool){
    if(bool){
        document.querySelector('#actualCardPreview-cover').classList.add("open");
        document.querySelector('#actualCardPreview-inside-left').classList.add("open");
        document.querySelector('#actualCardPreview-inside-right').classList.add("open");
        document.querySelector('#insideCard').classList.add("open");
        
    }else{
        document.querySelector('#actualCardPreview-cover').classList.remove("open");
        document.querySelector('#actualCardPreview-inside-left').classList.remove("open");
        document.querySelector('#actualCardPreview-inside-right').classList.remove("open");
        document.querySelector('#insideCard').classList.remove("open");
    }
}

var input = document.querySelector('#imgupload');
input.addEventListener('change', updateImageDisplay);

function updateImageDisplay(){
    var src = input.files;

    var image = document.querySelector('#preview');
    image.style.opacity = 1;
    image.src = window.URL.createObjectURL(src[0]);
    showCardLogo(window.URL.createObjectURL(src[0]));
    document.querySelector('#addComp').style.opacity = 0;


}
/*
var form = document.getElementById("createCardForm");

document.getElementById("toSubmit").addEventListener("click", function () {
  form.submit();
});
*/
var prv = document.querySelector('#cardPreview');

document.querySelectorAll('.bg-images').forEach(x => { 
    x.addEventListener('click', function(){
        var imageLocation = this.parentElement.getAttribute("for");
        prv.style.backgroundImage = `url(${imageLocation})`;
        document.querySelector('#toCards').classList.remove('disabled');
    })})


var cardprv = document.querySelector('#actualCardPreview-cover');
var cardprvInsideLeft = document.querySelector('#actualCardPreview-inside-left');
var cardprvInsideRight = document.querySelector('#actualCardPreview-inside-right');

document.querySelectorAll('.card-images').forEach(x => { 
    x.addEventListener('click', function(){
        var imageLocation = this.parentElement.getAttribute("for");
        cardprv.src = imageLocation;

        var insideLeftLocation = imageLocation.replace('_cover', "_inside_left");
        var insideRightLocation = imageLocation.replace('_cover', "_inside_right");
        cardprvInsideLeft.src = insideLeftLocation;
        cardprvInsideRight.src = insideRightLocation;
        hasSelectedCard = true;
        document.querySelector('#toInfo').classList.remove('disabled');
    })})

    var currentURL = "";
    
    document.querySelector('#cardURL').addEventListener('click', function(){
        window.open("/" + currentURL,'_blank');
    })


function sendForm(){
    var formData = new FormData(document.querySelector('#createCardForm'));
    var xhr = new XMLHttpRequest;
    var emailInput = document.querySelector('#emailInput')
    if(emailInput.value == ""){
        alert('Please insert an email address.');
        emailInput.style.backgroundColor = "lightyellow";
        return;
    }
    
    xhr.responseType = 'json';    
    var cardBig = document.querySelector("h4").innerHTML;
    var cardSig = document.querySelector("h5").innerHTML;
    formData.append("message", cardBig);
    formData.append("signature", cardSig);
    
    xhr.onload  = function() {
        currentURL = xhr.response.url;
        document.querySelector('#cardURL').textContent = currentURL;
        
        toggleShare(true);

        //alert(xhr.response);

    };

    xhr.open('post', '/fileupload', true);
    xhr.send(formData);
}

var share = document.querySelector('#sharePanel');
var cover = document.querySelector('#cover');
function toggleShare(bool){
    if(bool){
        cover.style.display = "block";
        share.style.display = "block";
    }else {
        cover.style.display = "none";
        share.style.display = "none";
    }
}

document.querySelector('#cover').addEventListener('click', function(){ toggleShare(false)});

var cardState = false;
document.querySelector('#actualCardPreview-inside-left').addEventListener('click', function(){ 
    toggleCard(cardState)
    cardState = !cardState;
});

document.querySelector('#actualCardPreview-cover').addEventListener('click', function(){ 
    toggleCard(cardState)
    cardState = !cardState;
});


document.querySelector('#closeShare').addEventListener('click', function(){
    toggleShare(false)
});

var logoPrev = document.querySelector('#logoPreview');
var logoShowing = true;
var signature = document.querySelector('h5');

document.querySelector('#logoPreview').addEventListener('click', function(){
    logoPrev.style.display = "none";
    signature.style.bottom = "calc(5% + 35px)";
    logoShowing = !logoShowing;
})

function showCardLogo(src){
    logoPrev.src = src;
    logoPrev.style.display = "block";
    signature.style.bottom = "calc(5% + 100px)";
    logoShowing = !logoShowing;

}


document.querySelector('#coverButton').addEventListener('click', function(){
    //document.querySelector('#welcomePanel').style.top = "-100vh";
    document.querySelector('#welcomePanel').style.opacity = 0;
    document.querySelector('#welcomePanel').style.pointerEvents = "none";
})