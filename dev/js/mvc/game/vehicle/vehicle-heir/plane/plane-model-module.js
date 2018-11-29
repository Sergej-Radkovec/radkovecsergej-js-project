(function (window) {
  'use strict';

  class PlaneModel extends window.airPlaneMVC.VehicleModel {
    draw() {
      this._view.draw();
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.PlaneModel = PlaneModel;
})(window);
