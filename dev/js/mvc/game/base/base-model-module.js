(function (window) {
  'use strict';

  class BaseModel {
    constructor({ top, left, width, height, angle, type }) {
      this.type = type;
      this.sizeX = window.innerWidth * width / 100;
      this.sizeY = window.innerHeight * height / 100;
      this.posX = (window.innerWidth * width / 100) / 2 + window.innerWidth * left / 100;
      this.posY = (window.innerHeight * height / 100) / 2 + window.innerHeight * top / 100;
      this.angle = angle;
    }

    start(view) {
      this._view = view;
    }

    draw() {
      if (this._view) {
        this._view.draw();
      }
    }

    hide() {
      if (this._view) {
        this._view.hide();
      }
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.BaseModel = BaseModel;
})(window);
