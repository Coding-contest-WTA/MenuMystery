window.startButtonElement = document.getElementById('startButtonChop');
window.videoChopElement = document.getElementById('videoChop');
window.canvasElement = document.getElementById('canvas');
window.verifyButtonElement = document.getElementById('verifyButton');
window.resultMessagesElement = document.getElementById('resultMessages');
window.model;
window.objectsPositions = {};

window.startButtonElement.addEventListener('click', () => {
    initiateCamera().then(() => {
        window.verifyButtonElement.style.display = 'block'; // Show the verify button
    });
});

window.verifyButtonElement.addEventListener('click', () => {
    checkPosition();
});

async function initiateCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        window.videoChopElement.srcObject = stream;
        window.videoChopElement.style.display = 'block';
        await window.videoChopElement.play();
    } catch (error) {
        console.error('Error accessing the camera:', error);
    }
}

async function checkPosition() {
    if (!window.model) {
        window.model = await cocoSsd.load();
    }

    const ctx = window.canvasElement.getContext('2d');
    const videoChopWidth = 640;
    const videoChopHeight = 480;

    ctx.drawImage(window.videoChopElement, 0, 0, videoChopWidth, videoChopHeight);

    window.model.detect(window.canvasElement).then(predictions => {
        updateObjectsPositions(predictions);

        if (areObjectsCrossing()) {
            displayResult("Bravo, c'est correct !");
        } else {
            displayResult("Ce n'est pas encore complètement ça, regardez la démonstration avant de réessayer !");
        }
    });
}

function updateObjectsPositions(predictions) {
    for (const prediction of predictions) {
        window.objectsPositions[prediction.class] = prediction.bbox;
    }
}

function areObjectsCrossing() {
    // Check if there are at least two detected objects.
    const objectNames = Object.keys(window.objectsPositions);

    if (objectNames.length < 2) {
        return false;
    }

    for (let i = 0; i < objectNames.length - 1; i++) {
        for (let j = i + 1; j < objectNames.length; j++) {
            const rectA = window.objectsPositions[objectNames[i]];
            const rectB = window.objectsPositions[objectNames[j]];

            if (isRectOverlap(rectA, rectB)) {
                return true; // Significant overlap.
            }
        }
    }

    return false; // No significant overlap.
}

function isRectOverlap(rectA, rectB) {
    return (
        rectA[0] < rectB[0] + rectB[2] &&
        rectA[0] + rectA[2] > rectB[0] &&
        rectA[1] < rectB[1] + rectB[3] &&
        rectA[1] + rectA[3] > rectB[1]
    );
}

function displayResult(message) {
    window.resultMessagesElement.innerHTML = "";
    const resultParagraph = document.createElement('p');
    resultParagraph.textContent = message;
    window.resultMessagesElement.appendChild(resultParagraph);
}
