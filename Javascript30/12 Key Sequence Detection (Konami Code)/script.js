window.addEventListener("load", handleSite);

function handleSite() {
    window.addEventListener("keydown", afterKeyFlow);
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var mySequence = [];
    var outOfTime; //for timeOut function Id
    const iconsFromPage = document.querySelectorAll(".key");

    updateMessage("Wpisz kod na nieśmiertelność.");
    updateTip("Musisz być szybki.");

    function afterKeyFlow(event) {
        clearTimeout(outOfTime); //cancel previous sequence reseting
        outOfTime = setTimeout(resetSequence, 250); //if is 0.25 sec gap between keys, sequence will be reseted
        addKeyToSequence(event.keyCode);
        markValidSequence();
        checkForKonamiCode() ? success() : 0;         //if whole sequence successed
    }
    //function backs elements to initial value after success
    function setInitialState() {
        window.removeEventListener("keydown", setInitialState);
        document.querySelector(".wrapper").classList.remove("immortal");
        updateMessage("Spróbój jeszcze raz.");
        updateTip("Teraz powinno być łatwiej.");
    }
    //turning buttons that match sequence into red
    function markValidSequence() {
        mySequence.every(function (key, index) {
            if (key == konamiCode[index]) {
                setIconAsGood(iconsFromPage[index]);
                return true;
            }
            else {
                return false;
            }
        });
    }
    //check if sequention is whole and valid
    function checkForKonamiCode() {
        if (mySequence.length == konamiCode.length) {
            return konamiCode.every(function checkKeysEquality(key, index) {
                return key == mySequence[index];
            })
        }
        return false;
    }

    function addKeyToSequence(key) {
        mySequence.push(key);
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

    function updateMessage(message) {
        document.querySelector(".message").textContent = message;
    }

    function updateTip(tip) {
        document.querySelector(".tip").textContent = tip;
    }

    function success() {
        clearTimeout(outOfTime); //stop reseting after success
        document.querySelector(".wrapper").classList.add("immortal"); //to trigger blinking animation
        updateMessage("Udało się! Jesteś nieśmiertelny!");
        updateTip("Byłeś bardzo szybki.");
        window.addEventListener("keydown", setInitialState); //to prevent piling-up listeners
    }
}