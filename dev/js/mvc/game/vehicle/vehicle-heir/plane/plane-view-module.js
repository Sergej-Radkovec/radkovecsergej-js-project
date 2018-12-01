(function (window) {

  class PlaneView extends window.airPlaneMVC.VehicleView {
    draw() {
      const planeObj = document.createElement('img');
      planeObj.id = 'plane';
      planeObj.src = 'img/plane.svg';
      planeObj.style.position = 'absolute';
      planeObj.style.width = `${this._model.unitSize}px`;
      planeObj.style.height = `${this._model.unitSize}px`;
      planeObj.style.transform = 'translate(-50%, -50%)';
      wrapper.appendChild(planeObj);
      this.obj = planeObj;
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.PlaneView = PlaneView;
})(window);
