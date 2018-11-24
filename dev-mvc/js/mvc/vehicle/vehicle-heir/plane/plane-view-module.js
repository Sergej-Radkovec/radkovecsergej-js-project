(function (window) {
  'use strict';

  class PlaneView {
    constructor() {
      this.model = null;
      this.obj = null;
    }

    start(model) {
      this.model = model;
    }

    drow() {
      const planeObj = document.createElement('img');
      planeObj.src = 'img/plane.svg';
      planeObj.style.position = 'absolute';
      planeObj.style.width = `${this.model.unitSize}px`;
      planeObj.style.height = `${this.model.unitSize}px`;
      planeObj.style.transform = 'translate(-50%, -50%)';
      wrapper.appendChild(planeObj);
      this.obj = planeObj;
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.PlaneView = PlaneView;
})(window);
