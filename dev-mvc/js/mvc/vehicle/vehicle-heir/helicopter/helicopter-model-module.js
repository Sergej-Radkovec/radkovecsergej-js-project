(function (window) {
  'use strict';

  class HelicopterModel extends window.airPlaneMVC.VehicleModel {
    constructor() {
      const helicopterParam = {
        size: 80,
        speed: 0.5,
        typeBase: 2,
        cost: 2,
      };

      super(helicopterParam);
      this.view = null;
    }
    //Как связать метод Update и Drow
    start(view) {
      if (this.view) {
        this.view.drow();
      }
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.HelicopterModel = HelicopterModel;
})(window);
