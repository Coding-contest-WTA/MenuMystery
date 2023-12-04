window.video = document.getElementById('video');
window.captureButton = document.getElementById('captureButton');
window.capturedImage = document.getElementById('canvas');
window.predictionsDiv = document.getElementById('message');


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


window.captureButton.addEventListener('click', () => {
  const context = window.capturedImage.getContext('2d');
  context.drawImage(window.video, 0, 0, window.capturedImage.width, window.capturedImage.height);
  runObjectDetection(window.capturedImage);
});