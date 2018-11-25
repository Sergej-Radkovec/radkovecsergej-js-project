(function (window) {
  'use strict';

  class VehicleModel {
    constructor({ size, speed, typeBase, cost }) {
      this.way = [];
      this.unitSize = size;
      this.speed = speed;
      this.typeBase = typeBase;
      this.cost = cost;
      this.onBase = false;
      this.speedX = null;
      this.speedY = null;
      this.posX = null;
      this.posY = null;
      this._view = null;
    }

    start(view) {
      this._view = view;
    }

    updateView() {
      if(this._view) {
        this._view.update();
        this._view.drawWay();
      }
    }

    culcRandomDirection() {
      const perimeter = window.innerWidth * 2 + window.innerHeight * 2;
      const randomPosition = Math.random() * perimeter;
      const randomAngle = Math.random() * 2 * Math.PI;

      this.speedX = this.speed * Math.cos(randomAngle);
      this.speedY = this.speed * Math.sin(randomAngle);

      if (randomPosition < window.innerWidth) {
        this.posX = randomPosition;
        this.posY = 0;
      } else if (randomPosition < window.innerWidth + window.innerHeight) {
        this.posX = window.innerWidth;
        this.posY = randomPosition - window.innerWidth;
      } else if (randomPosition < window.innerWidth * 2 + window.innerHeight) {
        this.posX = window.innerWidth * 2 + window.innerHeight - randomPosition;
        this.posY = window.innerHeight;
      } else {
        this.posX = 0;
        this.posY = perimeter - randomPosition;
      }
    }

    positionUnit() {
      let cutLength;
      let sin;
      let cos;
      const posEnd = this.way[this.way.length - 1];

      if (!this.way.length) {
        this.posX += this.speedX;
        this.posY += this.speedY;
      } else {
        cutLength = Math.sqrt((posEnd[0] - this.posX) * (posEnd[0] - this.posX)
          + (posEnd[1] - this.posY) * (posEnd[1] - this.posY));
        sin = (posEnd[0] - this.posX) / cutLength;
        cos = (posEnd[1] - this.posY) / cutLength;
        if (cutLength > this.speed) {
          this.speedX = sin * this.speed;
          this.speedY = cos * this.speed;
          this.posX += this.speedX;
          this.posY += this.speedY;
        } else {
          if (this.way.length === 1) {
            this.way.pop();
            this.posX += this.speedX;
            this.posY += this.speedY;
          } else {
            const posStart = this.way.pop();
            const remained = this.speed - cutLength;
            cutLength = Math.sqrt((posEnd[0] - this.posX) * (posEnd[0] - this.posX)
              + (posEnd[1] - this.posY) * (posEnd[1] - this.posY));
            sin = (posEnd[0] - posStart[0]) / cutLength;
            cos = (posEnd[1] - posStart[1]) / cutLength;
            this.posX = posStart[0] + sin * remained;
            this.posY = posStart[1] + cos * remained;
          }
        }
      }

      if (this.posX < 0) {
        this.speedX *= -1;
      }
      if (this.posX > window.innerWidth) {
        this.speedX *= -1;
      }
      if (this.posY < 0) {
        this.speedY *= -1;
      }
      if (this.posY > window.innerHeight) {
        this.speedY *= -1;
      }
      this.updateView();
    }

    setWay(e) {
      e = e || window.event;
      e.preventDefault();
      let x = e.pageX;
      let y = e.pageY;
      this.way.unshift([x, y]);
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.VehicleModel = VehicleModel;
})(window);
