(function (window) {
  'use strict';

  class HelicopterModel extends window.airPlaneMVC.VehicleModel {
    draw() {
      this._view.draw();
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.HelicopterModel = HelicopterModel;
})(window);
