window.video = document.getElementById('video');
window.object_text = document.getElementById('text_reco1');
window.chopsticks_text = document.getElementById('text_reco2');
window.resultMessagesElement = document.getElementById('message');
window.isObjectDetectionRunning = false;

var videoContainer = document.getElementById("videoContainer");
var baguettesInfos = document.getElementById("baguettesInfos");
var startedVideoContainer = false;

/*async function initiateCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        window.videoChopElement.srcObject = stream;
        window.videoChopElement.style.display = 'block';
        await window.videoChopElement.play();
    } catch (error) {
        console.error('Error accessing the camera:', error);
    }
}*/
async function startCamera() {
    try{
        const stream = await navigator.mediaDevices.getUserMedia({ 'video': true });
        window.video.srcObject = stream;
        await window.video.play();
    } catch (error) {
        console.error('Error accessing the camera:', error);
    }
}

$(document).ready(function () {
    autoChangeLanguage()
});


function initialOpening() {
    videoContainer.style.display = "block";
    startedVideoContainer = true;

    startCamera();
    window.isObjectDetectionRunning = true;
}

document.getElementById("ouvrirReconnaissance").addEventListener("click", function () {
    if (!startedVideoContainer) {
        initialOpening();
    }
    baguettesInfos.style.display = "none"; 

    object_text.style.display = "";
    chopsticks_text.style.display = "none"; 
    resultMessagesElement.textContent = "";  
});

document.getElementById("ouvrirChopsTrain").addEventListener("click", function () {
    if (!startedVideoContainer) {
        initialOpening();
    }
    baguettesInfos.style.display = "block"; 

    object_text.style.display = "none";
    chopsticks_text.style.display = ""; 
    resultMessagesElement.textContent = "";
});