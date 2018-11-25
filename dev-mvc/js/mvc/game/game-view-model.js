(function (window) {
  'use strict';

  class GameView {
    constructor(model) {
      this._model = model;
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.GameView = GameView;
})(window);