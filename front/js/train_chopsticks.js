window.videoChopElement = document.getElementById('video');
window.canvasElement = document.getElementById('canvas');
window.verifyButtonElement = document.getElementById('verifyButton');
window.resultMessagesElement = document.getElementById('message');
window.model;
window.objectsPositions = {};

window.verifyButtonElement.addEventListener('click', () => {
    checkPosition();
});

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
            displayResult(valueDependingLanguage("Well done, it's correct", "Bravo, c'est correct !"));
        } else {
            displayResult(
                valueDependingLanguage(
                    "It's not completely done, see the demo before retry it!",
                    "Ce n'est pas encore complètement ça, regardez la démonstration avant de réessayer !")
            );

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
