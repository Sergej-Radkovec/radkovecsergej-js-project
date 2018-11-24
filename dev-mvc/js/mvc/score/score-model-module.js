(function (window) {
  'use strict';

  class ScoreModel {
    constructor(data) {
      this._data = data;
      this._view = null;
    }

    start (view) {
      this._view = view;
    }

    updateView() {
      if(this._view) {
        this._view.update();
      }
    }

    get fullScores() {
      return this._data;
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.ScoreModel = ScoreModel;
})(window);
