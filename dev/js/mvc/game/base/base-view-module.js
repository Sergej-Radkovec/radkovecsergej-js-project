(function (window) {

  class BaseView {
    constructor(model, container) {
      this._model = model;
      this._conteiner = container;
    }

    draw(position) {
      const baseObj = document.createElement('div');
      baseObj.style.position = 'absolute';
      baseObj.style.backgroundColor = '#dfe6f0';
      baseObj.style.borderRadius = '50px';
      baseObj.style.width = `${position.width}%`;
      baseObj.style.height = `${position.height}%`;
      baseObj.style.left = `${position.left}%`;
      baseObj.style.top = `${position.top}%`;
      baseObj.style.opacity = 0;
      baseObj.style.transform = `rotate(${position.angle}deg)`;
      this._conteiner.appendChild(baseObj);
      this.obj = baseObj;
    }

    show() {
      this.obj.style.opacity = 0.5;
    }

    hide() {
      this.obj.style.opacity = 0;
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.BaseView = BaseView;
})(window);
