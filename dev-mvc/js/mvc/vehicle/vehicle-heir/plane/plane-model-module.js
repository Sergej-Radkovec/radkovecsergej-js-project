(function (window) {
  'use strict';

  class PlaneModel extends window.airPlaneMVC.VehicleModel {
    drow() {
      this._view.drow();
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.PlaneModel = PlaneModel;
})(window);
