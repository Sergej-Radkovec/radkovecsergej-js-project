(function (window) {
  'use strict';

  class VehicleController {
    constructor(model, view, game) {
      this._model = model;
      this._view = view;
      this._game = game;

      this._game.newLoop.attach(() => {
        this._model.positionUnit();
      });
      this._game.newUnit.attach(() => {
        this._model.draw();
        this._model.culcRandomDirection();
      });

      document.addEventListener('mousedown', () => this.startSetWay(), false);
    }

    startSetWay(event) {
      event = event || window.event;
      event.preventDefault();
      if (event.target === this._view.obj || isDescendant(this._view.obj, event.target)) {

        this._model.onBase = false;
        this._model.way = [];

        document.onmousemove = () => this._model.setWay();
      }

      document.addEventListener('mouseup', () => {
        document.onmousemove = null;
      });

      function isDescendant(parent, child) {
        let node = child.parentNode;
        while (node != null) {
          if (node === parent) {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      }
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.VehicleController = VehicleController;
})(window);