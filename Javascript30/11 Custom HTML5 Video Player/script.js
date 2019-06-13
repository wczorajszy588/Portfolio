window.addEventListener("load", handleSite);

var player;

function handleSite() {
    const playerDOM = document.querySelector(".player");

    player = (function Player(player) {
    //catching up DOM elements
        var myPlayer =  {
            video: player.querySelector(".screen"),
            progressBar: player.querySelector(".video-progress-bar"),
            volumeBar: player.querySelector(".video-volume-bar"),
            volumeAmountBar: player.querySelector(".volume-amount-bar"),
            volumeAmountTxt: player.querySelector(".volume-amount-txt"),
            elapsedTimeBar: player.querySelector(".elapsed-time"),
            playBtn: player.querySelector(".video-play-btn"),
            backwardBtn: player.querySelector(".backward"),
            forwardBtn: player.querySelector(".forward"),
            currTimeIndicator: player.querySelector(".video-curr-time")
        }
        var {
            video,
            progressBar,
            elapsedTimeBar,
            volumeBar,
            volumeAmountBar,
            volumeAmountTxt,
            playBtn,
            backwardBtn,
            forwardBtn,
            currTimeIndicator
        } = myPlayer || {};

    //setting up listeners
        progressBar.addEventListener("click", moveTo);
        volumeBar.addEventListener("click", volumeTo);
        playBtn.addEventListener("click", play);
        forwardBtn.addEventListener("click", e => forward(5) );
        backwardBtn.addEventListener("click", e => backward(5) );
        video.addEventListener("timeupdate", updateAccordingToTime);
        video.addEventListener("volumechange", updateAccordingToVolume);
        video.addEventListener("ended", updatePlayIcon);
        document.addEventListener("keydown", keyboardControl);
    
    //setting video player elements at starting position
        updateAccordingToTime();
        updateAccordingToVolume();
    
    //making API to control video player
        var api = {
            play,
            forward,
            backward,
            setTimeTo,
            setVolumeTo
        };
        return api;
    
    /************************************************* */

        function play() {
            video.paused 
                ? video.play()
                : video.pause();
            updatePlayIcon();
        }
    
        function forward(secs) {
            var currentTime = video.currentTime;
            setTimeTo(currentTime += secs);
        }
    
        function backward(secs) {
            var currentTime = video.currentTime;
            setTimeTo(currentTime -= secs);
        }
    
        function setTimeTo(time) {
            //preventing out of video limits values for time
            if (time > video.duration) {
                time = video.duration;
            }
            else if (time < 0) {
                time = 0;
            }
            setBarValueTo(time, "currentTime");
        }
    
        function setVolumeTo(volume) {
            //preventing out of limits values for volume
            var warningMsg;
            if (volume < 0 || volume > 1) {
                warningMsg = "Volume must be 0 - 1.";
            }
            if (volume > 1) {
                volume = 1;
                warningMsg += " Now setted to maximum";
                console.warn(warningMsg);
            }
            else if (volume < 0) {
                volume = 0;
                warningMsg += " Now setted to minimum";
                console.warn(warningMsg);

            }
            setBarValueTo(volume, "volume");
        }
    
        function moveTo(event) {   
            var clickedTime = calcClickedTime(event);
            setTimeTo(clickedTime);
        }
    
        function volumeTo(event) {   
            var clickedVolume = calcClickedVolume(event);
            setVolumeTo(clickedVolume);
        }
    
        function setBarValueTo(value, type) {
            //checking is value a number
            if ( typeof value == "number" && value == value ) {
                video[type] = value;
            }
            else {
                console.error("Value must be a number");
            }
        }
    
        function calcClickedVolume(e) {
            var volumeBarWidth = getNumericElemProperty(volumeBar, "width");
            var clickPosition = e.offsetX;
            var volumePercent = (clickPosition / volumeBarWidth) * 100;
            return (volumePercent * 1) / 100;
        }
    
        function calcClickedTime(e) {
            var progressBarWidth = getNumericElemProperty(progressBar, "width");
            var clickPosition = e.offsetX;
            var timePercent = (clickPosition / progressBarWidth) * 100;
            var videoFullLength = video.duration;
            return (timePercent * videoFullLength) / 100; 
        }
    
        function getNumericElemProperty(elem, property) {
            var dimension = window.getComputedStyle(elem)[property].match(/[0-9]+/)[0];
            return Number(dimension);
        }
    
        function updateAccordingToTime() {
            var elapsedTimePercent = (video.currentTime /video.duration) * 100;
            updateProgressBar(elapsedTimePercent);
            updateTime(video.currentTime);
        }
    
        function updateAccordingToVolume() {
            var volumePercent = (video.volume / 1) * 100;
            updateVolumeBar(volumePercent);
        }
    
        function updateProgressBar(elapsedTimePercent) {
            elapsedTimeBar.style.width = elapsedTimePercent.toFixed(2) + "%";
        }

        function updateVolumeBar(volumePercent) {
            volumeAmountBar.style.width = volumePercent.toFixed(2) + "%";
            volumeAmountTxt.textContent = volumePercent.toFixed(0) + "%";
        }

        function updateTime(currentTime) {
            var fullTime = Number(video.duration.toFixed(0));
            if (!fullTime) {
                fullTime = "0:00:00";
            } 
            else {
                var fullHour = getHour(fullTime);
                var fullMinute = getMinute(fullTime);
                var fullSecond = getSecond(fullTime);
                fullTime = `${fullHour}:${fullMinute}:${fullSecond}`;
            }
            
            currentTime = Number(currentTime.toFixed(0));
            var hour = getHour(currentTime);
            var minute = getMinute(currentTime);
            var second = getSecond(currentTime);
            
            currTimeIndicator.textContent = 
            `${hour}:${minute}:${second} / ${fullTime}`;
        }

        function getSecond(currentTime) {
            var second = Number(Math.floor(currentTime % 60).toFixed(0));
            second = second == 60 ? 0 : second;
            second = String(second).length == 1 
                            ? "0" + String(second)
                            : second; 
            return String(second);
        }

        function getMinute(currentTime) {
            var minute = Number((Math.floor(currentTime / 60) % 60).toFixed(0));
            minute = minute == 60 ? 0 : minute;
            minute = String(minute).length == 1 
                            ? "0" + String(minute) 
                            : minute; 
            return String(minute);
        }

        function getHour(currentTime) {
            var hour = Math.floor(Math.floor(currentTime / 60) / 60);
            return String(hour.toFixed(0));
        }

        function updatePlayIcon() {
            var icon;
            if (video.paused || video.ended) {
                icon = "play_arrow";
            }
            else if (video.played && !video.ended) {
                icon = "pause";
            }
            playBtn.textContent = icon;
        }

        function keyboardControl(e) {
            switch (e.code) {
                case "Space":
                    play();
                    break;
                case "ArrowLeft":
                    backward(5);
                    break;
                case "ArrowRight":
                    forward(5);
                    break;
                case "ArrowUp":
                    setVolumeTo(video.volume + 0.05);
                    break;
                case "ArrowDown":
                    setVolumeTo(video.volume - 0.05);
                    break;
            } 
        }
    })(playerDOM);
    console.info("Użyj zmiennej 'player', żeby skorzystać z API:", player);
    return player;
}

