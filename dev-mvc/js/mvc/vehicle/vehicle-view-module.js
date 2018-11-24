(function (window) {
  'use strict';

  class VehicleView {
    constructor(model) {
      this._model = model;
      this.obj = null;
    }

    update() {
      if (this.obj) {
        const sin = this._model.speedX / Math.sqrt(this._model.speedX * this._model.speedX + this._model.speedY * this._model.speedY);
        let angle = Math.asin(sin) * 180 / Math.PI;
        if (this._model.speedY > 0) {
          angle = 180 - angle;
        }

        this.obj.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        this.obj.style.left = `${this._model.posX}px`;
        this.obj.style.top = `${this._model.posY}px`;
      }
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.VehicleView = VehicleView;
})(window);
