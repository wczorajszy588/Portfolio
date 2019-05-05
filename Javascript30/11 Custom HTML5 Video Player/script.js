window.addEventListener("load", handleSite);

function handleSite() {
    const player = document.querySelector(".player");
    styleVideoProgressBar(player);

}

function styleVideoProgressBar(player) {
    const video = player.querySelector(".screen");
    const screenHeight = window.getComputedStyle(video).height.match(/[^px]+/g)[0];
    const screenWidth = window.getComputedStyle(video).width.match(/[^px]+/g)[0];
    const controls = player.querySelector(".controls");
    const controlsHeight = window.getComputedStyle(controls).height.match(/[^px]+/g)[0];
    const playBtnPct = controlsHeight / screenWidth * 100;
    console.log(playBtnPct);
    player.style.setProperty("--player-height", screenHeight + "px");
}