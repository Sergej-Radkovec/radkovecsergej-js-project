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

  const sounds = {
    music: 'audio/audio_music_heartbeats.ogg',
    startSound: 'audio/audio_start_game.ogg',
    selectUnitSound: 'audio/audio_plane.ogg',
    crashSound: 'audio/audio_crashland.ogg',
    lendedSound: 'audio/audio_landed.ogg',
    runWaySound: 'audio/audio_runway.ogg',
  };

  const airPlane = new airPlaneMVC.GameModel(16, 200);
  const airPlaneView = new airPlaneMVC.GameView(airPlane, stateElements, view);
  const airPlaneAudio = new airPlaneMVC.GameAudio(sounds);
  const airPlaneController = new airPlaneMVC.GameController(airPlane, buttons);
  airPlane.startView(airPlaneView);
  airPlane.startAudio(airPlaneAudio);
}

initApp();
