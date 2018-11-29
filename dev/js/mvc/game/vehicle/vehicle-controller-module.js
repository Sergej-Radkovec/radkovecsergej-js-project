(function (window) {

  class VehicleController {
    constructor(model, view, game) {
      this._model = model;
      this._view = view;
      this._game = game;
      this._base = null;
      this.setWay = this.setWay.bind(this);
      this.startSetWay = this.startSetWay.bind(this);

      this._game.newLoop.attach(() => {
        this._model.positionUnit();
      });

      this._game.newUnit.attach(() => {
        this._model.draw();
        this._model.culcRandomDirection();
      });

      this._game.gameOver.attach(() => {
        this._model.unitOnBase.listener = [];
        document.removeEventListener('mousedown', this.startSetWay, false);
      });

      document.addEventListener('mousedown', this.startSetWay, false);
    }

    addBase(base) {
      this._base = base;
    }

    setWay(e) {
      e = e || window.event;
      e.preventDefault();
      this._model.setWay(e);

      this._base.forEach(base => {
        if (base.type === this._model.typeBase) {
          if (Math.abs(e.pageX - base.posX) < base.sizeX / 4
            && Math.abs(e.pageY - base.posY) < base.sizeY / 4) {
            this._model.wayOnBase();
            document.removeEventListener('mousemove', this.setWay, false);
          }
        }
      });
    }

    startSetWay(event) {
      event = event || window.event;
      event.preventDefault();
      if (event.target === this._view.obj || isDescendant(this._view.obj, event.target)) {

        this._model.onBase = false;
        this._model.way = [];
        this._model.findBase();

        document.addEventListener('mousemove', this.setWay, false);
      }

      document.addEventListener('mouseup', () => {
        this._model.hideBase();
        document.removeEventListener('mousemove', this.setWay, false);
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