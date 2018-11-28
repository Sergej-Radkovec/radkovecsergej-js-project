(function (window) {
  'use strict';

  class RecordsController {
    constructor (model, scoreModel, recordButton, storeUserNameButton, userNameField) {
      this._model = model;
      this._scoreModel = scoreModel;
      this._recordButton = recordButton;
      this._storeUserNameButton = storeUserNameButton;
      this._userNameField = userNameField;
      this._recordButton.addEventListener('click', () => this._model.getHighscores(), false);
      this._storeUserNameButton.addEventListener('click', () => {
        this._model.addNewResult(this._userNameField.value, this._scoreModel.fullScores)
      }, false);
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.RecordsController = RecordsController;
})(window);
