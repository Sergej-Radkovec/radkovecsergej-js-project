(function (window) {
  'use strict';

  class GameModel {
    constructor(frequency, generateSpeed) {
      this.units = [];
      this.bases = [];
      this.playing = false;
      this._frequency = frequency;
      this._generateSpeed = this._frequency * generateSpeed;
      this.timeGame = 0;
      this._view = null;
      this.newUnit = new airPlaneMVC.Events(this);

      this.helicopterParam = {
        size: 80,
        speed: 0.5,
        typeBase: 2,
        cost: 2,
      };
      this.planeParam = {
        size: 80,
        speed: 0.7,
        typeBase: 1,
        cost: 1,
      };
    }

    start(view) {
      this._view = view;
    }

    updateView() {
      if(this._view) {
        this._view.update();
      }
    }

    startGame() {
      if (this.playing === false) {
        this.playing = true;
      }

      this.units = [];
    }

    game() {
      if (this.playing) {
        this.timeGame += this._frequency;
        if (this.timeGame % this._generateSpeed === 0 || this.timeGame === this._frequency) {
          this.units.push(this.generateUnit());
        }
      }
      this.units = [];
    console.log('идёт игра');
    }

    generateUnit() {
      let generateUnit;

      if (Math.random() < 0.65) {
        generateUnit = new airPlaneMVC.PlaneModel(this.planeParam);
        const planeView = new airPlaneMVC.PlaneView(generateUnit);
        generateUnit.start(planeView);
      } else {
        generateUnit = new airPlaneMVC.HelicopterModel(this.helicopterParam);
        const helicopterView = new airPlaneMVC.HelicopterView(generateUnit);
        generateUnit.start(helicopterView);
      }

      console.log('сгенерирован юнит');
      this.newUnit.notify(generateUnit);
      generateUnit.culcRandomDirection();
      generateUnit.draw();
      return generateUnit;
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.GameModel = GameModel;
})(window);