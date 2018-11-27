(function (window) {
  'use strict';

  class GameModel {
    constructor(frequency, generateSpeed) {
      this.units = [];
      this.bases = [];
      this.playing = false;
      this._frequency = frequency;
      this._generateSpeed = this._frequency * generateSpeed;
      this.timeGame = 0;
      this._view = null;
      this.newUnit = new airPlaneMVC.Events(this);
      this.newLoop = new airPlaneMVC.Events(this);

      this.helicopterParam = {
        size: 80,
        speed: 0.5,
        typeBase: 2,
        cost: 2,
      };

      this.planeParam = {
        size: 80,
        speed: 0.7,
        typeBase: 1,
        cost: 1,
      };

      this.base1Param = {
        top: 29.7,
        left: 33,
        width: 20,
        height: 9,
        angle: 0,
        type: 1,
      };

      this.base2Param = {
        top: 57.3,
        left: 50.5,
        width: 18,
        height: 8.2,
        angle: 138,
        type: 1,
      };

      this.base3Param = {
        top: 59.2,
        left: 71.3,
        width: 4,
        height: 8.2,
        angle: 0,
        type: 2,
      };
    }

    start(view) {
      this._view = view;
    }

    updateView() {
      if(this._view) {
        this._view.update();
      }
    }

    startGame() {
      if (this.playing === false) {
        this.playing = true;
      }
      this.units.forEach(unit => unit._view.obj.remove());
      this.units = [];

      this.bases.push(new airPlaneMVC.BaseModel(this.base1Param));
      this.bases.push(new airPlaneMVC.BaseModel(this.base2Param));
      this.bases.push(new airPlaneMVC.BaseModel(this.base3Param));
      this.bases.forEach(base => {
        base.start(new airPlaneMVC.BaseView(base, document.getElementById('game')));
      });
    }

    game() {
      if (this.playing) {
        this.timeGame += this._frequency;
        if (this.timeGame % this._generateSpeed === 0 || this.timeGame === this._frequency) {
          this.units.push(this.generateUnit());
        }
        this.newLoop.notify();
        this.findCrash();
      }
    }

    findCrash() {
      const length = this.units.length;
      for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length; j++) {
          const dist = Math.sqrt((this.units[j].posX - this.units[i].posX) * (this.units[j].posX - this.units[i].posX)
            + (this.units[j].posY - this.units[i].posY) * (this.units[j].posY - this.units[i].posY));
          const ultraDist = (this.units[i].unitSize / 2 + this.units[j].unitSize / 2) * 0.8;
          if (dist < ultraDist) {
            this.gameover();
          }
        }
      }
    }

    gameover() {
      this.playing = false;
    }

    generateUnit() {
      let generateUnit;
      let view;

      if (Math.random() < 0.65) {
        generateUnit = new airPlaneMVC.PlaneModel(this.planeParam);
        view = new airPlaneMVC.PlaneView(generateUnit);

      } else {
        generateUnit = new airPlaneMVC.HelicopterModel(this.helicopterParam);
        view = new airPlaneMVC.HelicopterView(generateUnit);
      }

      const controller = new airPlaneMVC.VehicleController(generateUnit, view, this);
      controller.addBase(this.bases);
      generateUnit.start(view);

      generateUnit.mouseDownOnUnit.attach((sender) => {
        this.bases.forEach((base) => {
          if (base.type === sender.typeBase) {
            base.draw();
          }
        });
      });
      generateUnit.mouseUpOnUnit.attach((sender) => {
        this.bases.forEach((base) => {
          if (base.type === sender.typeBase) {
            base.hide();
          }
        });
      });
      generateUnit.unitOnBase.attach((sender) => {
        const index = this.units.indexOf(sender);
        this.units[index]._view.obj.remove();
        this.units.splice(index, 1);
      });
      this.newUnit.notify(generateUnit);
      this.newUnit._listeners = [];

      return generateUnit;
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.GameModel = GameModel;
})(window);