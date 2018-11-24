(function (window) {
  'use strict';

  class HelicopterModel extends window.airPlaneMVC.VehicleModel {
    drow() {
      this._view.drow();
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.HelicopterModel = HelicopterModel;
})(window);
