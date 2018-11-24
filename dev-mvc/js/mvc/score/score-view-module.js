(function (window) {
  'use strict';

  class ScoreView {
    constructor(model, selector) {
      this._model = model;
      this._selector = selector;
    }

    update() {
      this._selector.innerHTML = this._model.get();
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.ScoreView = ScoreView;
})(window);
