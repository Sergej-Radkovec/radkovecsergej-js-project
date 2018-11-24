(function (window) {
  'use strict';

  class VehicleController {
    constructor() {
      this.model = null;
    }

    start(model) {
      this.model = model;
    }


  }




  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.VehicleController = VehicleController;
})(window);