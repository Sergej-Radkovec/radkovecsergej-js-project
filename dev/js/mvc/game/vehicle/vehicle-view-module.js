(function (window) {

  class VehicleView {
    constructor(model) {
      this._canvas = document.querySelector('#canvas');
      this._ctx = this._canvas.getContext('2d');
      this._model = model;
      this.obj = null;
    }

    update() {
      if (this.obj) {
        const sin = this._model.speedX / Math.sqrt(this._model.speedX * this._model.speedX + this._model.speedY * this._model.speedY);
        let angle = Math.asin(sin) * 180 / Math.PI;
        if (this._model.speedY > 0) {
          angle = 180 - angle;
        }

        this.obj.style.transform = `translate(${this._model.posX - this.obj.offsetWidth / 2}px,
         ${this._model.posY - this.obj.offsetHeight / 2}px) translateZ(0) rotate(${angle}deg)`;
      }
    }

    drawWay() {
      if (this._model.way.length) {
        if (this._model.onBase) {
          this._ctx.strokeStyle = '#31C46F';
        } else {
          this._ctx.strokeStyle = '#C49E4E';
        }
        this._ctx.lineWidth = window.innerWidth / 140;
        this._ctx.setLineDash([20, 20]);
        this._ctx.lineCap = 'round';
        this._ctx.lineJoin = 'round';
        this._ctx.beginPath();
        this._ctx.moveTo(this._model.way[0][0], this._model.way[0][1]);
        this._model.way.forEach(pos => this._ctx.lineTo(pos[0], pos[1]));
        this._ctx.stroke();
      }
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.VehicleView = VehicleView;
})(window);
