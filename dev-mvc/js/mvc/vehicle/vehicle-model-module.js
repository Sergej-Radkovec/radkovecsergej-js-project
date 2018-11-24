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

    start (view) {
      this._view = view
    }

    updateView() {
      this._view.update();
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
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.VehicleModel = VehicleModel;
})(window);
