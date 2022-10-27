

console.log("hiya")
//getting the html elements by id//
const currentTime = document.getElementById("current-time")
const totalTime = document.getElementById("total-time")
const playPauseButton = document.getElementById("play-pause-button")
const scrubBar = document.getElementById("scrub-bar")
const audio = new Audio("audio/Soft-Background-for-Interview.webm");

let isScrubing = false

//audio play pause //
playPauseButton.onclick = function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
//audio play scrub on//
audio.oncanplaythrough = function () {
    scrubBar.disabled = false;
}
//audio play button change//
audio.onplay = function(){
    playPauseButton.src = "images/pause.svg"
}
//audio pause button change//
audio.onpause = function(){
    playPauseButton.src = "images/play.svg"
}
//time funtions on load//
audio.onloadedmetadata = function(){
    totalTime.innerHTML = formatTime(audio.duration); 
    currentTime.innerHTML = formatTime(0)
    scrubBar.max = math.floor(audio.duration);
}
//time functions in time//
audio.ontimeupdate = function(){
currentTime.innerHTML = formatTime(audio.currentTime)
if(!isScrubing){
    scrubBar.value = Math.floor(audio.currentTime)
}
}
//when audio ends//
audio.onended = function(){
    currentTime.innerHTML = formatTime(0);
    scrubBar.value = 0;
    playPauseButton.src = "images/play.svg"
}
//scrub bar listener//
scrubBar.oninput = function(){
    isScrubing = true;
}
// seek bar change // 
scrubBar.onchange = function(){
    audio.currentTime = scrubBar.value
}


// takes total seconds (number) and returns a formatted string //
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}