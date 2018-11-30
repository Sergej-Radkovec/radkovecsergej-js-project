function initApp() {

  const view = {
    canvas: document.querySelector('#canvas'),
    wrapper: document.getElementById('wrapper'),
  }

  const buttons = {
    startButton: document.getElementById('start'),
    recordButton: document.getElementById('showRecords'),
    menuButton: document.getElementById('backToMenu'),
    storeUserNameButton: document.getElementById('storeUserName'),
  };

  const stateElements = [
    { state: 'menu', id: 'menu' },
    { state: 'game', id: 'game' },
    { state: 'records', id: 'recordsMenu' }];

  const airPlane = new airPlaneMVC.GameModel(16, 200);
  const airPlaneView = new airPlaneMVC.GameView(airPlane, stateElements, view);
  airPlane.start(airPlaneView);
  const airPlaneController = new airPlaneMVC.GameController(airPlane, buttons);
  airPlane.renderNewState();
}

initApp();
