(function (window) {
  'use strict';

  class GameView {
    constructor(model, stateElements) {
      this._model = model;
      this.canvas = document.querySelector('#canvas');
      this._stateElements = stateElements;
      this.ctx = this.canvas.getContext('2d');
      this._model.newLoop.attach(() => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      });
    }

    changePage() {
      this._stateElements.forEach(entry => {
        const showElement = entry.state === this._model._state.page;
        document.getElementById(entry.id).style.display = showElement ? 'block' : 'none';
      });
    }

    toggleSaveControls(show) {
      document.getElementById('userName').style.display = show ? 'block' : 'none';
      document.getElementById('storeUserName').style.display = show ? 'block' : 'none';
    }

    writeScore(score){
      document.getElementById('title').innerHTML =
        `Игра окончена! (Вы набрали: ${score} очков)`;
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.GameView = GameView;
})(window);