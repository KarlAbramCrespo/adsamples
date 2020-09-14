var imgArray = [];
var imgCtr = 0;
var autoPlayCarousel;
var autoPlayCarouselCtr = 0;
var slideCtr = 0;

function startBanner() {
    initializeImages();
}

function initializeImages() {
    preloadImage(document.getElementById("samsungLogo"), "images/Samsung_Logo_White.png");
    preloadImage(document.getElementById("galaxyBudsLogo"), "images/GalaxyBuds_Logo_White.png");
    preloadImage(document.getElementById("logo"), "images/SamsungGalaxyBuds_Logo_Black.png");
    preloadImage(document.getElementsByClassName("slide")[0], "images/productImage_1.png");
    preloadImage(document.getElementsByClassName("slide")[1], "images/productImage_2.png");
    preloadImage(document.getElementsByClassName("slide")[2], "images/productImage_3.png");
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
            setupCarousel();
            clearInterval(checkImageInterval);
        }
    }, 500);
}

function setupCarousel() {
    document.getElementsByClassName("slide")[0].classList.add("curr");
    document.getElementsByClassName("slide")[1].style.transform = "translateX(300px)";
    document.getElementsByClassName("slide")[1].classList.add("next");
    document.getElementsByClassName("slide")[2].style.transform = "translateX(-300px)";
    document.getElementsByClassName("slide")[2].classList.add("prev");
    updateCopy();
    
    animateBanner();
}

function animateBanner() {
    console.log("Animation started!");

    main.style.visibility = "visible";

    setTimeout(function () {
        samsungLogo.style.transform = "translateX(-300px)";
        galaxyBudsLogo.style.transform = "translateX(300px)";

        setTimeout(function () {
            frame1.style.transform = "translateY(-250px)";
            arrowLeft.style.display = "block";
            arrowRight.style.display = "block";
            
            
            setTimeout(function(){
                playCarousel();
            }, 0);
            
        }, 2000);

    }, 0);
}

function playCarousel(){
    console.log("test");
    autoPlayCarousel = setInterval(function(){
        autoPlayCarouselCtr++;
        if(autoPlayCarouselCtr > 3){
            clearInterval(autoPlayCarousel);
        }else{
            nextCarouselItem();
        }
    }, 3000);
}

function updateCopy(){
    var tempCopy = document.getElementsByClassName("copyCont");
    
    
    for(i = 0; i < 3; i++){
        tempCopy[i].classList.remove("copyTransitionDelayed");
        tempCopy[i].classList.remove("copyTransition");
    }
    
    
    for(i = 0; i < 3; i++){
        if(i == slideCtr){
            tempCopy[i].classList.add("copyTransitionDelayed");
        }else{
            tempCopy[i].classList.add("copyTransition");
        }
    }
    
    for(i = 0; i < 3; i++){
        if(i == slideCtr){
            tempCopy[i].style.opacity = 1;
        }else{
            tempCopy[i].style.opacity = 0;
        }
    }
}

function updateCtr(setting){
    if(setting == "prev"){
        slideCtr--;
    }else{
        slideCtr++;
    }
    
    if(slideCtr > 2){
        slideCtr = 0;
    }else if(slideCtr <0){
        slideCtr = 2;
    }
}

function disableNavButtons(){
    
    arrowLeft.style.pointerEvents = "none";
    arrowRight.style.pointerEvents = "none";
    
    setTimeout(function(){
        arrowLeft.style.pointerEvents = "auto";
        arrowRight.style.pointerEvents = "auto";
        
    }, 500);
}

function nextCarouselItem(){
    
    document.getElementsByClassName("curr")[0].classList.add("transition");
    document.getElementsByClassName("next")[0].classList.add("transition");
    document.getElementsByClassName("prev")[0].classList.remove("transition");
    
    document.getElementsByClassName("curr")[0].style.transform = "translateX(-300px)";
    document.getElementsByClassName("prev")[0].style.transform = "translateX(300px)";
    document.getElementsByClassName("next")[0].style.transform = "translateX(0px)";
    
    updateCtr("next");
    updateCopy();
    clearCarouselItemClass();
    updateCarouselItemClass();
    disableNavButtons();
}

function prevCarouselItem(){
    
    document.getElementsByClassName("curr")[0].classList.add("transition");
    document.getElementsByClassName("next")[0].classList.remove("transition");
    document.getElementsByClassName("prev")[0].classList.add("transition");
    
    document.getElementsByClassName("curr")[0].style.transform = "translateX(300px)";
    document.getElementsByClassName("next")[0].style.transform = "translateX(-300px)";
    document.getElementsByClassName("prev")[0].style.transform = "translateX(0px)";
    
    updateCtr("prev");
    updateCopy();
    clearCarouselItemClass();
    updateCarouselItemClass();
    disableNavButtons();
}

function clearCarouselItemClass(){
    for(i = 0; i < document.getElementsByClassName("slide").length; i++){
        document.getElementsByClassName("slide")[i].classList.remove("curr");
        document.getElementsByClassName("slide")[i].classList.remove("next");
        document.getElementsByClassName("slide")[i].classList.remove("prev");
    }
}

function updateCarouselItemClass(){
    // this approach is strictly only for 3 item carousels
    
    var slideTemp = document.getElementsByClassName("slide");
    for(i = 0; i < slideTemp.length; i++){
        if(slideTemp[i].style.transform == "translateX(0px)"){
            slideTemp[i].classList.add("curr");  
        }else if(slideTemp[i].style.transform == "translateX(300px)"){
            slideTemp[i].classList.add("next");  
        }else{
            slideTemp[i].classList.add("prev");  
        }
    }
}

function bannerClicked(){
    window.open('', '_blank');
}

function bannerClickedFrame2(){
    window.open('', '_blank');
    clearInterval(autoPlayCarousel);
}

document.getElementById("arrowLeft").addEventListener("click", function(){
    console.log("prev");
    prevCarouselItem();
    clearInterval(autoPlayCarousel);
});

document.getElementById("arrowRight").addEventListener("click", function(){
    console.log("next");
    nextCarouselItem();
    clearInterval(autoPlayCarousel);
    
});
