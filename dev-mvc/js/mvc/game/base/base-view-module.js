(function (window) {
  'use strict';

  class BaseView {
    constructor(model, container) {
      this._model = model;
      this._conteiner = container;
    }

    draw() {
      const baseObj = document.createElement('div');
      baseObj.style.position = 'absolute';
      baseObj.style.backgroundColor = '#5860f0';
      baseObj.style.borderRadius = '50px';
      baseObj.style.width = `${this._model.sizeX}%`;
      baseObj.style.height = `${this._model.sizeY}%`;
      baseObj.style.left = `${this._model.posX}%`;
      baseObj.style.top = `${this._model.posY}%`;
      baseObj.style.opacity = 0;
      baseObj.style.transform = `rotate(${this._model.angle}deg`;
      this._conteiner.appendChild(baseObj);
      this.obj = baseObj;
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.BaseView = BaseView;
})(window);
