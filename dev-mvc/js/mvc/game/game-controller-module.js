(function (window) {
  'use strict';

  class GameController {
    constructor(model, startButton, recordButton, ) {
      this._model = model;
      this._startButton = startButton;
      this._recordButton = recordButton;
      this._gameTimer = null;
      this._startButton.addEventListener('click', () => this.startGame(), false);
      this._recordButton.addEventListener('click', () => this._model.switchToState({ page: 'records' }));
      window.onhashchange = this._model.renderNewState;
    }

    startGame() {
      this._model.startGame();
      this._gameTimer = setInterval(() => this._model.game(), this._model._frequency);
      this._model.switchToState({ page: 'game' })
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.GameController = GameController;
})(window);