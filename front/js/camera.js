window.video = document.getElementById('video');
window.object_text = document.getElementById('text_reco1');
window.chopsticks_text = document.getElementById('text_reco2');
window.no_permission_text = document.getElementById('text_no_permission');
window.resultMessagesElement = document.getElementById('message');
window.object_button = document.getElementById("ouvrirReconnaissance");
window.chopsticks_button = document.getElementById("ouvrirChopsTrain");
window.isObjectDetectionRunning = false;

var videoContainer = document.getElementById("videoContainer");
var baguettesInfos = document.getElementById("baguettesInfos");
var startedVideoContainer = false;
var stream = null;

async function startCamera() {
    try{
        stream = await navigator.mediaDevices.getUserMedia({ 'video': true });
        window.video.srcObject = stream;
        await window.video.play();
        console.log(stream);
    } catch (error) {
        console.error('Error accessing the camera:', error);
        text_no_permission.style.display = "block";
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

object_button.addEventListener("click", function () {
    if (!startedVideoContainer) {
        initialOpening();
    }
    baguettesInfos.style.display = "none"; 

    chopsticks_button.style.backgroundColor = "white";
    object_button.style.backgroundColor = "lightgrey";

    object_text.style.display = "";
    chopsticks_text.style.display = "none"; 
    resultMessagesElement.textContent = "";  
});

chopsticks_button.addEventListener("click", function () {
    if (!startedVideoContainer) {
        initialOpening();
    }
    baguettesInfos.style.display = "block"; 

    chopsticks_button.style.backgroundColor = "lightgrey";
    object_button.style.backgroundColor = "white";

    object_text.style.display = "none";
    chopsticks_text.style.display = ""; 
    resultMessagesElement.textContent = "";
});

let switchCamera1 = document.getElementById('switchCamera1');
let switchCamera2 = document.getElementById('switchCamera2');
let currentCamera = 'user'; // 'user' for front camera, 'environment' for rear camera

// Check if there is more than one camera
if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            if (videoDevices.length > 1) {
                // Si plusieurs caméras sont disponibles, affiche le bouton de bascule
                switchCameraButton1.style.display = 'block';
                switchCameraButton1.addEventListener('click', toggleCamera);
                switchCameraButton2.style.display = 'block';
                switchCameraButton2.addEventListener('click', toggleCamera);
            }
        })
        .catch(error => console.error('Error enumerating video devices:', error));
}

function toggleCamera() {
    currentCamera = (currentCamera === 'user') ? 'environment' : 'user';

    navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: currentCamera } }
    })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => console.error('Error switching camera:', error));
}
