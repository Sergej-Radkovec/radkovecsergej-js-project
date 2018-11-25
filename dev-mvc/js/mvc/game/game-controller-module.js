(function (window) {
  'use strict';

  class GameController {
    constructor(model, startButton) {
      this._model = model;
      this._startButton = startButton;
      this._startButton.addEventListener('click', () => this.startGame(), false);
    }

    startGame() {
      this._model.startGame();
      this._gameTimer = setInterval(() => this._model.game(), this._model._frequency);
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.GameController = GameController;
})(window);