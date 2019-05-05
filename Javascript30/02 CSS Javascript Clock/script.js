
window.onload = function() {
    /* Clock is scaled according to its width in css file*/
    // clock face settings
    const clock = document.getElementsByClassName("clock")[0]; 
    const clockWidthPx = window.getComputedStyle(clock).width.match(/[0-9]+/)[0];
    const clockBorderPx = clockWidthPx / 30;
    clock.style.borderRadius = clockWidthPx / 2 + clockBorderPx + "px";
    clock.style.borderWidth = clockBorderPx + "px";
    clock.style.height = clockWidthPx + "px";
    clock.style.minWidth = clockWidthPx + "px";
    // seconds hand properties
    const secHand = document.getElementsByClassName("secHand")[0];
    const secHandThickness = clockWidthPx / 90;
    const secHandStyles = { //styles for secHand element
        width: clockWidthPx / 2 - clockWidthPx / 30 + "px", //seconds hand length
        top: clockWidthPx / 2 - secHandThickness / 2 + "px",
        right: clockWidthPx / 2 + "px",
        height: secHandThickness + "px"
    }
    for ( key in secHandStyles ) { //put styles to secHand element
        secHand.style[key] = secHandStyles[key]; 
    }

    //minute hand properties
    const minHand = document.getElementsByClassName("minHand")[0];
    const minHandThickness = clockWidthPx / 30;
    const minHandStyles = {
        width: clockWidthPx / 2 - clockWidthPx / 30 + "px", //minute hand length
        top: clockWidthPx / 2 - minHandThickness / 2 + "px",
        right: clockWidthPx / 2 + "px",
        height: minHandThickness + "px"
    }

    for ( key in minHandStyles ) { //put styles to secHand element
        minHand.style[key] = minHandStyles[key]; 
    }

    //hour hand properties
    const hourHand = document.getElementsByClassName("hourHand")[0];
    const hourHandThickness = clockWidthPx / 20;
    const hourHandStyles = {
        width: clockWidthPx / 2 - clockWidthPx / 10 + "px", //hour hand length
        top: clockWidthPx / 2 - hourHandThickness / 2 + "px",
        right: clockWidthPx / 2 + "px",
        height: hourHandThickness + "px"
    }

    for ( key in hourHandStyles ) { //put styles to secHand element
        hourHand.style[key] = hourHandStyles[key]; 
    }

    const pin = document.getElementsByClassName("pin")[0];
    const pinSizePx = clockWidthPx / 25;
    const pinStyles = {
        border: `${pinSizePx}px solid black`,
        top: clockWidthPx / 2 - pinSizePx + "px",
        left: clockWidthPx / 2 - pinSizePx + "px",
        "border-radius": pinSizePx + "px"
    }
    
    for ( key in pinStyles ) {
        pin.style[key] = pinStyles[key];
    }
/* Hands positioning in time */
    //getting date in the page loading moment
    const date = new Date();
    const currHour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const currMinute = date.getMinutes();
    const currSeconds = date.getSeconds();

    //setting angle that every hand is moving in one second 
    const hourHandAngleBySec = 30/60/60;
    const minuteHandAngleBySec = 6/60;
    const secAngle = 6;

    const correctedRotation = 90; //correction to set hands from initial position to 12:00:00 position

    /* In order to perform hands positioning as in a real clock
    i've calculated how many seconds passed from 12:00:00 to current time
    and rotate that hands passed seconds time by degree by second angle*/
    
    //degree that hands moved from 12:00:00 to current time
    const initialHourMove = (currMinute * 60  + currSeconds) * hourHandAngleBySec;
    const initialMinuteMove = currSeconds * minuteHandAngleBySec;

    //hands rotation angle on start 
    let hourHandAngle = (currHour * secAngle * 5) + correctedRotation + initialHourMove;
    let minuteHandAngle = (currMinute * secAngle) + correctedRotation + initialMinuteMove;
    let secondsHandAngle = currSeconds * secAngle + correctedRotation;

    hourHand.style.transform = `rotate(${hourHandAngle}deg)`;
    secHand.style.transform = `rotate(${secondsHandAngle}deg)`;
    minHand.style.transform = `rotate(${minuteHandAngle}deg)`;

    const tickSound = document.getElementsByTagName("audio")[0];
    
    //after initial rotation update clock every second with setClock function
    setInterval(setClock, 1000);

    function setClock() {
        tickSound.currentTime = 0;
        tickSound.play().then( function() {
            document.getElementsByClassName("msg")[0].remove();
        }, function () {
            const msg = document.getElementsByClassName("msg")[0]
            msg.style.display = "block";
        });
        secondsHandAngle += secAngle;
        minuteHandAngle += minuteHandAngleBySec;
        hourHandAngle += hourHandAngleBySec;
        secHand.style.transform = `rotate(${secondsHandAngle}deg)`;
        minHand.style.transform = `rotate(${minuteHandAngle}deg)`;
        hourHand.style.transform = `rotate(${hourHandAngle}deg)`;
    }
}