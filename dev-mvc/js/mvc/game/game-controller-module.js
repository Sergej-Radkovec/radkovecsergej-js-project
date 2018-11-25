(function (window) {
  'use strict';

  class GameController {
    constructor(model, startButton) {
      this._model = model;
      this._startButton = _startButton;
      this._gameTimer = setInterval(this._model.game, this._model._frequency);
      this._startButton.addEventListener('click', this._model.startGame, false);
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.GameController = GameController;
})(window);