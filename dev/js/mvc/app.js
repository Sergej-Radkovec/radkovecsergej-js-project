function initApp() {
  const startButton = document.getElementById('start');
  const recordButton = document.getElementById('showRecords');
  const menuButton = document.getElementById('backToMenu');
  const storeUserNameButton = document.getElementById('storeUserName');
  const canvas = document.querySelector('#canvas');
  const wrapper = document.getElementById('wrapper');

  wrapper.style.width = `${window.innerWidth}px`;
  wrapper.style.height = `${window.innerHeight}px`;
  wrapper.style.backgroundImage = 'url(img/bg.jpg)';
  wrapper.style.backgroundSize = `${window.innerWidth}px ${window.innerHeight}px`;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'absolute';

  const stateElements = [
    { state: 'menu', id: 'menu' },
    { state: 'game', id: 'game' },
    { state: 'records', id: 'recordsMenu' }];

  const airPlane = new airPlaneMVC.GameModel(16, 350);
  const airPlaneView = new airPlaneMVC.GameView(airPlane, stateElements);
  airPlane.start(airPlaneView);
  const airPlaneController = new airPlaneMVC.GameController(airPlane, startButton, recordButton, menuButton, storeUserNameButton);
  airPlane.renderNewState();
}

initApp();
