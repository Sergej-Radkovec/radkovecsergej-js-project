(function (window) {
  'use strict';

  class VehicleController {
    constructor(model) {
      this._model = model;
    }


    //Когда в игре будет след цикл будет вызван данный метод
    gameLoop() {
      this._model.positionUnit();
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.VehicleController = VehicleController;
})(window);