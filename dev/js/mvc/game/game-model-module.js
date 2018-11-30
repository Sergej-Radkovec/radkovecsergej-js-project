(function (window) {

  class GameModel {
    constructor(frequency, generateSpeed) {
      this.units = [];
      this.bases = [];
      this.playing = false;
      this._frequency = frequency;
      this._generateSpeed = this._frequency * generateSpeed;
      this.timeGame = 0;
      this._view = null;
      this._audio = null;
      this._state = null;
      this.newUnit = new airPlaneMVC.Events(this);
      this.newLoop = new airPlaneMVC.Events(this);
      this.addScore = new airPlaneMVC.Events(this);
      this.gameOver = new airPlaneMVC.Events(this);

      this.helicopterParam = {
        size: Math.round(window.innerWidth / 18),
        speed:  window.innerWidth / 3200,
        typeBase: 2,
        cost: 2,
      };

      this.planeParam = {
        size: Math.round(window.innerWidth / 18),
        speed: window.innerWidth / 1800,
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

      this.elementForRecords = {
        recordButton: document.getElementById('showRecords'),
        storeUserNameButton: document.getElementById('storeUserName'),
        userNameField: document.getElementById('userName'),
      };

      this.bases.push(new airPlaneMVC.BaseModel(this.base1Param));
      this.bases.push(new airPlaneMVC.BaseModel(this.base2Param));
      this.bases.push(new airPlaneMVC.BaseModel(this.base3Param));
      this.bases.forEach(base => {
        base.start(new airPlaneMVC.BaseView(base, document.getElementById('game')));
        base.draw();
      });

      const scoreModel = new airPlaneMVC.ScoreModel(0);
      this._scores = scoreModel;
      const scoreView = new airPlaneMVC.ScoreView(scoreModel, document.getElementById('scores'));
      scoreModel.start(scoreView);
      const scoreController = new airPlaneMVC.ScoreController(scoreModel, this);

      const recordsModel = new airPlaneMVC.RecordsModel('RADKOVEC_AIRCONTROL_RECORDS', 'http://fe.it-academy.by/AjaxStringStorage2.php', 10);
      const recordsView = new airPlaneMVC.RecordsView(recordsModel, 'recordsTable');
      const recordsController = new airPlaneMVC.RecordsController(recordsModel, scoreModel, this.elementForRecords);
      recordsModel.start(recordsView);
    }

    startView(view) {
      this._view = view;
    }

    startAudio(audio) {
      this._audio = audio;
    }

    updateView() {
      if(this._view) {
        this._view.update();
      }
    }

    clearCanvas() {
      if(this._view) {
        this._view.clearCanvas();
      }
    }

    playSound(type) {
      if(this._audio) {
        this._audio.playSound(type);
      }
    }

    pauseSound(type) {
      if(this._audio) {
        this._audio.pauseSound(type);
      }
    }

    startGame() {
      this.units.forEach((unit, index) => {
        unit._view.obj.remove();
        unit.way = [];
      });

      this.units = [];
      this.timeGame = 0;
      this._scores.scores = 0;
      this._scores.updateView();

      if (this.playing === false) {
        this.playing = true;
      }

      this.playSound('startSound');
    }

    game() {
      if (this.playing) {
        this.timeGame += this._frequency;
        if (this.timeGame % this._generateSpeed === 0 || this.timeGame === this._frequency) {
          this.units.push(this.generateUnit());
        }
        this.clearCanvas();
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
            this.playSound('crashSound');
            this.gameover();
          }
        }
      }
    }

    gameover() {
      this.playing = false;
      this.newLoop.clearLesteners();
      this._view.toggleSaveControls(true);
      this.switchToState({ page: 'menu' });
      this._view.writeScore(this._scores.fullScores);
      this.gameOver.notify();
    }

    generateUnit() {
      let generateUnit;
      let view;
      let controller;

      if (Math.random() < 0.65) {
        generateUnit = new airPlaneMVC.PlaneModel(this.planeParam);
        view = new airPlaneMVC.PlaneView(generateUnit);

      } else {
        generateUnit = new airPlaneMVC.HelicopterModel(this.helicopterParam);
        view = new airPlaneMVC.HelicopterView(generateUnit);
      }

      if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        controller = new airPlaneMVC.VehicleControllerTouch(generateUnit, view, this);
      } else {
        controller = new airPlaneMVC.VehicleController(generateUnit, view, this);
      }

      controller.addBase(this.bases);
      generateUnit.start(view);

      generateUnit.mouseDownOnUnit.attach((sender) => {
        this.playSound('selectUnitSound');
        this.bases.forEach((base) => {
          if (base.type === sender.typeBase) {
            base.show();
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

      generateUnit.endWay.attach(() => this.playSound('runWaySound'));

      generateUnit.unitOnBase.attach((sender) => {
        this.playSound('lendedSound');
        this.addScore.notify(generateUnit.cost);
        const index = this.units.indexOf(sender);
        if (index !== -1) {
          this.units[index]._view.obj.remove();
          this.units.splice(index, 1);
        }
      });
      this.newUnit.notify(generateUnit);
      this.newUnit.clearLesteners();

      return generateUnit;
    }

    renderNewState() {
      const hash = window.location.hash;
      this._state = decodeURIComponent(hash.substr(1));

      if (this._state === '') {
        this.switchToState({ page: 'menu' });
      } else {
        this._state = JSON.parse(this._state);
      }

      if (this._state.page !== 'game') {
        this.playSound('gameMusic');
      } else {
        this.pauseSound('gameMusic');
      }

      if (this._state.page !== 'game' && this.playing) {
        if (confirm('Внимание! Текущий прогресс игры будет потерян')) {
          this.gameover();
        } else {
          this.switchToState({ page: 'game' });
        }
      }
      this._view.changePage(this._state);
    }

    switchToState(state) {
      this._state = state;
      location.hash = encodeURIComponent(JSON.stringify(state));
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.GameModel = GameModel;
})(window);
