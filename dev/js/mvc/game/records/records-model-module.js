(function (window) {

  class RecordsModel {
    constructor(ajaxName, ajaxHandlerScript, recordsLength) {
      this._stringName = ajaxName;
      this._ajaxHandlerScript = ajaxHandlerScript;
      this._recordsLength = recordsLength;
      this._password = null;
      this._userName = null;
      this._score = null;
      this._recordStorage = null;
      this._view = null;
    }

    start(view) {
      this._view = view;
    }

    updateView() {
      if (this._view) {
        this._view.showTable();
      }
    }

    loadRecords() {
      this.loadStorage(this.readReady);
    }

    addRecordToTable() {
      let addPossible = false;
      let userScoreExists;
      const userResult = {
        name: this._userName,
        score: this._score,
      };

      const existingUserScore = this._recordStorage.filter(result => this._userName === result.name);
      userScoreExists = existingUserScore.length > 0;

      if (userScoreExists) {
        if (existingUserScore[0].score < this._score) {
          addPossible = true;
          existingUserScore[0].score = this._score;
        }
      } else if (this._recordStorage.length < this._recordsLength) {
        this._recordStorage.push(userResult);
        addPossible = true;
      } else if (this._recordStorage[this._recordStorage.length - 1].score < this._score) {
        this._recordStorage[this._recordStorage.length - 1] = userResult;
        addPossible = true;
      }

      this._recordStorage.sort((A, B) => B.score - A.score);
      this.updateStorage();
      return addPossible;
    }

    updateStorage() {
      $.ajax({
        url: this._ajaxHandlerScript,
        type: 'POST',
        data: {
          f: 'UPDATE', n: this._stringName,
          v: JSON.stringify(this._recordStorage), p: this._password,
        },
        cache: false,
        success: (ResultH) => this.updateReady(ResultH),
        error: (ResultH) => this.errorHandler(ResultH),
      });
    }

    loadStorage() {
      $.ajax({
        url: this._ajaxHandlerScript,
        type: 'POST',
        data: { f: 'READ', n: this._stringName },
        cache: false,
        success: (ResultH) => this.readReady(ResultH),
        error: (ResultH) => this.errorHandler(ResultH),
      });
    }

    readReady(ResultH) {
      if (ResultH.error !== undefined) {
        alert(`Извините, таблицы рекордов временно недоступны.\n${ResultH.error}`);
      } else {

        if (ResultH !== '') {
          this._recordStorage = JSON.parse(ResultH.result);
        }
        if (!(this._recordStorage instanceof Array)) {
          this._recordStorage = [];
        }

        this.updateView();
      }
    }

    addUsers() {
      this._password = Math.random();
      $.ajax({
        url: this._ajaxHandlerScript,
        type: 'POST',
        data: {f: 'LOCKGET', n: this._stringName, p: this._password},
        cache: false,
        success: (ResultH) => this.lockGetReady(ResultH),
        error: (ResultH) => this.errorHandler(ResultH),
      });
    }

    lockGetReady(ResultH) {
      if (ResultH.error != undefined) {
        alert(`Извините, таблицы рекордов временно недоступны.\n${ResultH.error}`);
      } else {
        if (ResultH !== '') {
          this._recordStorage = JSON.parse(ResultH.result);
        }
        if (!(this._recordStorage instanceof Array)) {
          this._recordStorage = [];
        }

        if (!this.addRecordToTable()) {
          alert('Вы набрали недостаточно очков для таблицы рекордов');
        }
      }
    }

    updateReady(ResultH) {
      if (ResultH.error !== undefined) {
        alert(`Извините, таблицы рекордов временно недоступны.\n${ResultH.error}`);
      }
    }

    errorHandler(jqXHR, StatusStr, ErrorStr) {
      alert(`Извините, таблицы рекордов временно недоступны.\n${StatusStr} ${ErrorStr}`);
    }

    addNewResult (userNameToSave, scoreToSave) {
      this._userName = userNameToSave || 'Anonymous';
      this._score = Math.round(scoreToSave);
      this.addUsers();
    };

    getHighscores () {
      return this.loadRecords();
    };
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.RecordsModel = RecordsModel;
})(window);