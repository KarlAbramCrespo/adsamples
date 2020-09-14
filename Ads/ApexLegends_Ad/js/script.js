var imgArray = [];
var imgCtr = 0;
var tl;
var adSize = [300, 250];

function startBanner() {
    initializeImages();
}

function initializeImages() {
    preloadImage(banner1, "images/F1_Curtain_Left.png");
    preloadImage(banner2, "images/F1_Curtain_Middle.png");
    preloadImage(banner3, "images/F1_Curtain_Right.png");
    preloadImage(apexIcon, "images/F1_ApexIcon.png");
    preloadImage(smokeBG, "images/BG.png");
    preloadImage(footer, "images/Bottom_Overlay.png");
    preloadImage(apexLogo, "images/Apex_Logo.png");
    preloadImage(wraithInactive, "images/F2_Character_Btn_Inactive.png");
    preloadImage(wraithActive, "images/F2_Character_Btn_Active.png");
    preloadImage(pathfinderInactive, "images/F3_Character_Btn_Inactive.png");
    preloadImage(pathfinderActive, "images/F3_Character_Btn_Active.png");
    preloadImage(cryptoInactive, "images/F4_Character_Btn_Inactive.png");
    preloadImage(cryptoActive, "images/F4_Character_Btn_Active.png");
    preloadImage(battleBtn, "images/CTA_btn.png");
    preloadImage(wraithPortrait, "images/F2_Character.png");
    preloadImage(pathfinderPortrait, "images/F3_Character.png");
    preloadImage(cryptoPortrait, "images/F4_Character.png");

    checkImages();
}

function preloadImage(elem, img) {
    imgCtr++;
    var temp = new Image();

    temp.src = img;
    temp.onload = function (e) {
        imgArray.push(temp);
    }
    elem.style.backgroundImage = "url(" + temp.src + ")";
}

function checkImages() {
    var checkImageInterval = setInterval(function () {
        if (imgCtr == imgArray.length) {
            startAnimation();
            clearInterval(checkImageInterval);
        }
    }, 500);
}

function startAnimation() {
    tl = new TimelineMax();

    tl.set(main, {
        opacity: 1
    })
    
    tl.set(["#pathfinderActive", "#cryptoActive"], {
        opacity: 0 
    });

    tl.from(banner1, 0.5, {
        y: adSize[1] * -1
    });
    tl.from(banner2, 0.5, {
        y: adSize[1] * -1
    }, "-=0.3");
    tl.from(banner3, 0.5, {
        y: adSize[1] * -1
    }, "-=0.3");

    tl.to(frame1, 0.5, {
        delay: 0.5,
        y: adSize[1] * -1,
        onComplete: function () {
            showCharacter("wraith");
        }
    });
}

function showCharacter(character) {
    // reset positioning of characters
    for(i = 0; i < 3; i++){
        gsap.set(document.querySelectorAll("#characterCont > *")[i].getElementsByClassName("characterPortrait")[0], {
            x: 0,
            opacity: 0
        });
        gsap.set(document.querySelectorAll("#characterCont > *")[i].getElementsByClassName("characterCopyCont")[0], {
            x: 0,
            opacity: 0
        });
        gsap.set(document.querySelectorAll("#characterSelectionCont > *")[i].getElementsByClassName("btnActive")[0], {
            opacity: 0
        })
    }
    
    var tempElem, tempBtn;

    switch (character) {
        case "crypto":
            tempElem = document.getElementById("cryptoCharacterCont");
            tempBtn = document.getElementById("cryptoActive");
            break;
        case "pathfinder":
            tempElem = document.getElementById("pathfinderCharacterCont");
            tempBtn = document.getElementById("pathfinderActive");
            break;
        default:
        case "wraith":
            tempElem = document.getElementById("wraithCharacterCont");
            tempBtn = document.getElementById("wraithActive");
            break;
    }
    
    
    
    updateBGColor(character);
    
    // not setting the opacity will cause glitches
    gsap.set(tempBtn, {
        opacity: 1 
    });
    
    gsap.set(tempElem.getElementsByClassName("characterPortrait")[0], {
        opacity: 1 
    });
    
    gsap.set(tempElem.getElementsByClassName("characterCopyCont")[0], {
        opacity: 1 
    });
    
    gsap.to(tempElem.getElementsByClassName("characterPortrait")[0], 0.3, {
        x: adSize[0]
    });

    gsap.to(tempElem.getElementsByClassName("characterCopyCont ")[0], 0.3, {
        x: adSize[0] * -1
    });
}


function updateBGColor(character) {
    switch (character) {
        case "crypto":
            characterSelectFrame.classList.remove("color1");
            characterSelectFrame.classList.remove("color2");
            characterSelectFrame.classList.add("color3");
            break;
        case "pathfinder":
            characterSelectFrame.classList.remove("color1");
            characterSelectFrame.classList.remove("color3");
            characterSelectFrame.classList.add("color2");
            break;
        default:
        case "wraith":
            characterSelectFrame.classList.remove("color3");
            characterSelectFrame.classList.remove("color2");
            characterSelectFrame.classList.add("color1");
            break;
    }
}

function interactivity(state){
    if(state === 0){
        for(i = 0; i < 3; i++){
            document.querySelectorAll("#characterSelectionCont > *")[i].classList.add("noInteraction");
        }
    } else {
        for(i = 0; i < 3; i++){
            document.querySelectorAll("#characterSelectionCont > *")[i].classList.remove("noInteraction");
        }
    }
}

document.getElementById("wraithCont").addEventListener("mouseover", function () {
    showCharacter("wraith");
});

document.getElementById("pathfinderCont").addEventListener("mouseover", function () {
    showCharacter("pathfinder");
});

document.getElementById("cryptoCont").addEventListener("mouseover", function () {
    showCharacter("crypto");
});

function bannerClicked(){
    window.open('', '_blank');
}
