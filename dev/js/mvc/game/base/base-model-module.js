(function (window) {

  class BaseModel {
    constructor({ top, left, width, height, angle, type }) {
      this._posision = {top, left, width, height, angle};
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
        this._view.draw(this._posision);
      }
    }

    show() {
      if (this._view) {
        this._view.show();
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
