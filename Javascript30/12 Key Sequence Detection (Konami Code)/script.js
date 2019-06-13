window.addEventListener("load", handleSite);

function handleSite() {
    window.addEventListener("keydown", addKey);
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var mySequence = [];
    var outOfTime; //for timeOut function Id
    const iconsFromPage = document.querySelectorAll(".key");
    function addKey(event) {
        clearTimeout(outOfTime); //cancel previous sequence reseting
        outOfTime = setTimeout(resetSequence, 250); //if is 0.25 sec gap between keys, sequence will be reseted
        document.querySelector(".message").textContent = "Wpisz kod na nieśmiertelność."
        document.querySelector(".wrapper").classList.remove("immortal");
        mySequence.push(event.keyCode);

        markProgress();
        if ( checkForKonamiCode() ) {
            clearTimeout(outOfTime); //to stop reseting after success
            document.querySelector(".wrapper").classList.add("immortal");
            document.querySelector(".message").textContent = "Udało się! Jesteś nieśmiertelny."
        }
    }
    //marking progress on site
    function markProgress() {
        mySequence.map(function (key, index) {
            if (key == konamiCode[index]) {
                setIconAsGood(iconsFromPage[index]);
            }
            else {
                resetSequence();
            }
            return key;
        })
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
}