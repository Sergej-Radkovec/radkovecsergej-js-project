(function (window) {
  'use strict';

  class PlaneModel extends window.airPlaneMVC.VehicleModel {
    constructor() {
      const planeParam = {
        size: 80,
        speed: 0.7,
        typeBase: 1,
        cost: 1,
      };

      super(planeParam);
      this.view = null;
    }


    ///////Попробовать супер/////
    start(view) {
      if (this.view) {
        this.view.drow();
      }
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.PlaneModel = PlaneModel;
})(window);
