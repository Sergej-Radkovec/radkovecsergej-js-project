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
      baseObj.style.backgroundColor = '#dfe6f0';
      baseObj.style.borderRadius = '50px';
      baseObj.style.width = `${this._model.sizeX}px`;
      baseObj.style.height = `${this._model.sizeY}px`;
      baseObj.style.left = `${this._model.posX}px`;
      baseObj.style.top = `${this._model.posY}px`;
      baseObj.style.opacity = 0.5;
      baseObj.style.transform = `translate(-50%,-50%) rotate(${this._model.angle}deg)`;
      this._conteiner.appendChild(baseObj);
      this.obj = baseObj;
    }

    hide() {
      this.obj.remove();
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.BaseView = BaseView;
})(window);
