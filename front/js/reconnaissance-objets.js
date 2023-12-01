window.video = document.getElementById('video');
window.startButton = document.getElementById('startButton');
window.captureButton = document.getElementById('captureButton');
window.capturedImage = document.getElementById('capturedImage');
window.predictionsDiv = document.getElementById('predictions');
window.messageDiv = document.getElementById('message');
window.isObjectDetectionRunning = false;

async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ 'video': true });
  window.video.srcObject = stream;
}

async function runObjectDetection(imageElement) {
  const model = await cocoSsd.load();
  const predictions = await model.detect(imageElement);
  window.predictionsDiv.innerHTML = '';
  for (const prediction of predictions) {
    const { class: label, score, bbox } = prediction;
    const p = document.createElement('p');
    p.innerText = `${label} (${Math.round(score * 100)}%)`;
    window.predictionsDiv.appendChild(p);
  }
}

window.startButton.addEventListener('click', () => {
  startCamera();
  window.isObjectDetectionRunning = true;
});

window.captureButton.addEventListener('click', () => {
  const context = window.capturedImage.getContext('2d');
  context.drawImage(window.video, 0, 0, window.capturedImage.width, window.capturedImage.height);
  runObjectDetection(window.capturedImage);
});

window.startButton.addEventListener('click', () => {
  window.isObjectDetectionRunning = !window.isObjectDetectionRunning;
});
