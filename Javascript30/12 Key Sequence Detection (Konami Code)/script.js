window.addEventListener("load", handleSite);

function handleSite() {
    window.addEventListener("keydown", afterKeyFlow);
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var mySequence = [];
    var outOfTime; //for timeOut function Id
    const iconsFromPage = document.querySelectorAll(".key");

    const DOMElements = {
        wrapper: document.querySelector(".wrapper"),
        iconsFromPage: document.querySelectorAll(".key"),
        message: document.querySelector(".message"),
        tip: document.querySelector(".tip")
    }

    DOMElements.message.textContent = "Wpisz kod na nieśmiertelność.";
    DOMElements.tip.textContent = "Musisz być szybki.";

    function afterKeyFlow(event) {
        clearTimeout(outOfTime); //cancel previous sequence reseting
        outOfTime = setTimeout(resetSequence, 250); //if is 0.25 sec gap between keys, sequence will be reseted
        mySequence.push(event.keyCode);
        mySequence.every(markValidKey);
        konamiCode.every(isKeyValid) ? success() : 0;
    }
    //function backs elements to initial value after success
    function setInitialState() {
        window.removeEventListener("keydown", setInitialState);
        DOMElements.wrapper.classList.remove("immortal");
        DOMElements.message.textContent = "Spróbuj jeszcze raz.";
        DOMElements.tip.textContent = "Teraz powinno być łatwiej.";
        resetSequence();
    }

    //turning buttons that match sequence into red
    function markValidKey(key, index) {
        return (function IIFE( key ) {
            if ( key == konamiCode[index] ) {
                setIconAsGood( iconsFromPage[index] );
                return true;
            }
        })(key);
    }
    //check if sequention is whole and valid

    function isKeyValid(key, index) {
            return (function IIFE( key ) {
                return key == mySequence[index];
            })(key);
    }

    function resetSequence() {
        mySequence = [];
        for (icon of iconsFromPage) {
            setIconAsBad(icon);
        }
    }

    function setIconAsGood(icon) {
        icon.classList.remove("bad");
        icon.classList.add("good");
    }

    function setIconAsBad(icon) {
        icon.classList.remove("good");
        icon.classList.add("bad");
    }

    function success() {
        clearTimeout(outOfTime); //stop reseting after success
        document.querySelector(".wrapper").classList.add("immortal"); //to trigger blinking animation
        DOMElements.message.textContent = "Udało się! Jesteś nieśmiertelny!";
        DOMElements.tip.textContent = "Byłeś bardzo szybki.";
        window.addEventListener("keydown", setInitialState); //to prevent piling-up listeners
    }
}