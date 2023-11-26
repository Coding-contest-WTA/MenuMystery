const video = document.getElementById('video');
const startButton = document.getElementById('startButton');
const captureButton = document.getElementById('captureButton');
const capturedImage = document.getElementById('capturedImage');
const predictionsDiv = document.getElementById('predictions');
const messageDiv = document.getElementById('message');
let isObjectDetectionRunning = false;

async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ 'video': true });
  video.srcObject = stream;
}

async function runObjectDetection(imageElement) {
  const model = await cocoSsd.load();
  const predictions = await model.detect(imageElement);
  predictionsDiv.innerHTML = '';
  for (const prediction of predictions) {
    const { class: label, score, bbox } = prediction;
    const p = document.createElement('p');
    p.innerText = `${label} (${Math.round(score * 100)}%)`;
    predictionsDiv.appendChild(p);
  }
}

startButton.addEventListener('click', () => {
  startCamera();
  isObjectDetectionRunning = true;
});

captureButton.addEventListener('click', () => {
  const context = capturedImage.getContext('2d');
  context.drawImage(video, 0, 0, capturedImage.width, capturedImage.height);
  runObjectDetection(capturedImage);
});

startButton.addEventListener('click', () => {
  isObjectDetectionRunning = !isObjectDetectionRunning;
});
