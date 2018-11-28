(function (window) {
  'use strict';

  class GameController {
    constructor(model, startButton, recordButton, menuButton) {
      this._model = model;
      this._startButton = startButton;
      this._recordButton = recordButton;
      this._menuButton = menuButton;
      this._gameTimerID = null;
      this._startButton.addEventListener('click', () => this.startGame(), false);
      this._recordButton.addEventListener('click', () => this._model.switchToState({ page: 'records' }), false);
      this._menuButton.addEventListener('click', () => this._model.switchToState({ page: 'menu' }), false);

      window.addEventListener('hashchange', () => this._model.renderNewState(), false);
    }

    startGame() {
      clearInterval( this._gameTimerID);
      this._model.startGame();
      this._gameTimerID = setInterval(() => this._model.game(), this._model._frequency);
      this._model.switchToState({ page: 'game' });
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.GameController = GameController;
})(window);