(function (window) {
  'use strict';

  class GameView {
    constructor(model) {
      this._model = model;
      this.canvas = document.querySelector('#canvas');
      this.ctx = this.canvas.getContext('2d');
      this._model.newLoop.attach(() => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      });
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.GameView = GameView;
})(window);