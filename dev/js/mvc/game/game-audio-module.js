(function (window) {

  class GameAudio {
    constructor({ music, startSound, selectUnitSound, crashSound, lendedSound, runWaySound }) {
      this.gameMusic = new Audio(music);
      this.startSound = new Audio(startSound);
      this.selectUnitSound = new Audio(selectUnitSound);
      this.crashSound = new Audio(crashSound);
      this.lendedSound = new Audio(lendedSound);
      this.runWaySound = new Audio(runWaySound);
    }

    playSound(type){
      switch (type) {
        case 'gameMusic':
          this.gameMusic.play();
          break;

        case 'startSound':
          this.startSound.play();
          break;

        case 'selectUnitSound':
          this.selectUnitSound.play();
          break;

        case 'crashSound':
          this.crashSound.play();
          break;

        case 'lendedSound':
          this.lendedSound.play();
          break;

        case 'runWaySound':
          this.runWaySound.play();
          break;
      }
    }

    pauseSound(type) {
      switch (type) {
        case 'gameMusic':
          this.gameMusic.pause();
          break;

        case 'startSound':
          this.startSound.pause();
          break;

        case 'selectUnitSound':
          this.selectUnitSound.pause();
          break;

        case 'crashSound':
          this.crashSound.pause();
          break;

        case 'lendedSound':
          this.lendedSound.pause();
          break;

        case 'runWaySound':
          this.runWaySound.pause();
          break;
      }
    }


  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.GameAudio = GameAudio;
})(window);
