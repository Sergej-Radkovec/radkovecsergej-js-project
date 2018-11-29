(function (window) {

  class ScoreController {
    constructor(model, game) {
      this._model = model;
      this._game = game;
      this._game.addScore.attach((sender, arg) => this._model.addScores(arg));
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.ScoreController = ScoreController;
})(window);