(function (window) {

  class ScoreView {
    constructor(model, selector) {
      this._model = model;
      this._selector = selector;
    }

    update() {
      this._selector.innerHTML = `Scores: ${this._model.fullScores}`;
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.ScoreView = ScoreView;
})(window);
