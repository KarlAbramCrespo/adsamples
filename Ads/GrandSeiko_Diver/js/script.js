var today = new Date();
var secHandDeg = 0;
var minHandDeg = 0;
var hourHandDeg = 0;
var bps = 20; //beats per second
var speed = 1000; //1000 is normal time

function init() {
    setSecondHand();
    setMinuteHand();
    setHourHand();

    setTimeout(initClock, 0);
    setTimeout(startClock, 0);

    setTimeout(fadeObjects, 500);
}

function initClock() {
    //    secondhand.style.transition = "transform 1s";
    //    minutehand.style.transition = "transform 1s";
    //    hourhand.style.transition = "transform 1s";

    dateComplication.innerHTML = today.getDate();
}

function startClock() {
    secondhand.style.removeProperty('transition');
    minutehand.style.removeProperty('transition');
    hourhand.style.removeProperty('transition');
    setInterval(moveSecondHand, speed / bps);
    setInterval(moveMinuteHand, speed / bps);
    setInterval(moveHourHand, speed / bps);
}

function setSecondHand() {
    console.log(today.getSeconds());
    secHandDeg = today.getSeconds() * 6;
    secondhand.style.transform = "rotate(" + secHandDeg + "deg)";
}

function setMinuteHand() {
    console.log(today.getMinutes());
    minHandDeg = (today.getMinutes() * 6) + today.getSeconds() / 12;
    minutehand.style.transform = "rotate(" + minHandDeg + "deg)";
}

function setHourHand() {
    console.log(today.getHours());
    hourHandDeg = ((360 / 12) * today.getHours()) + today.getMinutes() / 2;
    hourhand.style.transform = "rotate(" + hourHandDeg + "deg)";
}

function moveSecondHand() {
    secHandDeg += (360 / 60) / bps;
    secondhand.style.transform = "rotate(" + secHandDeg + "deg)";

    if (secHandDeg >= 360) {
        return secHandDeg = secHandDeg - 360;
    }
}

function moveMinuteHand() {
    minHandDeg += (((360 / 60)) / 60) / bps;
    minutehand.style.transform = "rotate(" + minHandDeg + "deg)";

    if (minHandDeg >= 360) {
        return minHandDeg = minHandDeg - 360;
    }
}

function moveHourHand() {
    hourHandDeg += ((((360 / 60)) / 60) / 12) / bps;
    hourhand.style.transform = "rotate(" + hourHandDeg + "deg)";

    if (hourHandDeg >= 360) {
        return hourHandDeg = hourHandDeg - 360;
    }
}

function fadeObjects() {
    setTimeout(function () {
        watch.style.opacity = 1;
        setTimeout(function () {
            logo.style.opacity = 1;
            setTimeout(function () {
                CTACopy.style.opacity = 1;
            }, 300);
        }, 300);
    }, 300);
}

function bannerClicked(){
    window.open('', '_blank');
}
