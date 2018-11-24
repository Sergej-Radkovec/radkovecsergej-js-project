(function (window) {
  'use strict';

  class VehicleView {
    constructor() {
      this.model = null;
    }

    start(model) {
      this.model = model;
    }

    update() {
      const sin = this.model.speedX / Math.sqrt(this.model.speedX * this.model.speedX + this.model.speedY * this.model.speedY);
      let angle = Math.asin(sin) * 180 / Math.PI;
      if (this.model.speedY > 0) {
        angle = 180 - angle;
      }

      ///////////////////Куда положить оbj///////////////////
      this.obj.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      this.obj.style.left = `${this.model.posX}px`;
      this.obj.style.top = `${this.model.posY}px`;
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.VehicleView = VehicleView;
})(window);
