(function (window) {
  'use strict';

  class BaseModel {
    constructor({ posY, posX, width, height, angle, type }) {
      this.type = type;
      this.sizeX = width;
      this.sizeY = height;
      this.posX = posX;
      this.posY = posY;
    }

    start (view) {
      this._view = view
    }

    updateView() {
      if(this._view) {
        this._view.update();
      }
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.BaseModel = BaseModel;
})(window);
