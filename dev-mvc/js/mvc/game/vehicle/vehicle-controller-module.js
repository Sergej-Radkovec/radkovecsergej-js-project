(function (window) {
  'use strict';

  class VehicleController {
    constructor(model, game) {
      this._model = model;
      this._game = game;
      this._game.newLoop.attach(() => this._model.positionUnit());
      this._game.newUnit.attach(() => this._model.draw());
    }

    changeUnitPosition() {
      this._model.positionUnit()
    }

  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.VehicleController = VehicleController;
})(window);