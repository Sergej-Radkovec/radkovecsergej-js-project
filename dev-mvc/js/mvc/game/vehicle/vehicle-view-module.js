(function (window) {
  'use strict';

  class VehicleView {
    constructor(model) {
      this.canvas = document.querySelector('#canvas');
      this.ctx = this.canvas.getContext('2d');
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

        this.obj.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        this.obj.style.left = `${this._model.posX}px`;
        this.obj.style.top = `${this._model.posY}px`;
      }
    }

    drawWay() {
      if (this._model.way.length) {
        if (this._model.onBase) {
          this.ctx.strokeStyle = '#31C46F';
        } else {
          this.ctx.strokeStyle = '#C49E4E';
        }
        this.ctx.lineWidth = 10;
        this.ctx.setLineDash([20, 20]);
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(this._model.way[0][0], this._model.way[0][1]);
        this._model.way.forEach(pos => this.ctx.lineTo(pos[0], pos[1]));
        this.ctx.stroke();
      }
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.VehicleView = VehicleView;
})(window);
