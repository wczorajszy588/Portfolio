window.onload = function() {
    window.addEventListener("keydown", playSound);
    window.addEventListener("keyup", () => {
        //when key is released..
        const played = document.getElementsByClassName("played")[0]; //get element marked as played
        if ( played ) { //if is any
            played.classList.remove("played"); //unmark him
        }
    }) 
}

function playSound(e) {
    const keys = document.querySelectorAll(".key"); //select every audio related div
    for (let key of keys) { //for every div...
        if (key.dataset.key == e.keyCode) { // if key pressed has its div...
            key.classList.add("played"); // ...add class to style played div
            const toPlay = key.getElementsByTagName("audio")[0]; //get audio element from that div
            toPlay.load(); //load this audio...
            toPlay.play(); //and play
        }
    }
}