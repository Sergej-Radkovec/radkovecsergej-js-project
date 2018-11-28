function initApp() {
  const startButton = document.getElementById('start');
  const recordButton = document.getElementById('showRecords');
  const menuButton = document.getElementById('backToMenu');
  const title = document.getElementById('title');
  const userName = document.getElementById('userName');
  const storeUserNameButton = document.getElementById('storeUserName');
  const gameObj = document.getElementById('game');
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const wrapper = document.getElementById('wrapper');

  wrapper.style.width = `${window.innerWidth}px`;
  wrapper.style.height = `${window.innerHeight}px`;
  wrapper.style.backgroundImage = 'url(img/bg.jpg)';
  wrapper.style.backgroundSize = `${window.innerWidth}px ${window.innerHeight}px`;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'absolute';

  const airPlane = new airPlaneMVC.GameModel(15, 400);
  const airPlaneView = new airPlaneMVC.GameView(airPlane);
  airPlane.start(airPlaneView);
  const airPlaneController = new airPlaneMVC.GameController(airPlane, startButton, recordButton, menuButton);
  airPlane.renderNewState();











  // const score = new airPlaneMVC.ScoreModel(0);
  // const scoreView =new airPlaneMVC.ScoreView(score, document.getElementById('scores'));
  //
  // const base1 = new airPlaneMVC.BaseModel(base1Param);
  // const base1View = new airPlaneMVC.BaseView(base1, document.getElementById('game'));
  //
  // const base2 = new airPlaneMVC.BaseModel(base2Param);
  // const base2View = new airPlaneMVC.BaseView(base2, document.getElementById('game'));
  //
  // const base3 = new airPlaneMVC.BaseModel(base3Param);
  // const base3View = new airPlaneMVC.BaseView(base3, document.getElementById('game'));
  //
  // bases.push(base1);
  // bases.push(base2);
  // bases.push(base3);








}

initApp();
