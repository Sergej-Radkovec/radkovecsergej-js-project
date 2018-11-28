(function (window) {
  'use strict';

  class GameView {
    constructor(model) {
      this._model = model;
      this.canvas = document.querySelector('#canvas');
      this.ctx = this.canvas.getContext('2d');
      this._model.newLoop.attach(() => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      });
    }

    changePage() {
      const stateElements = [
        { state: 'menu', id: 'menu' },
        { state: 'game', id: 'game' },
        { state: 'records', id: 'recordsMenu' }];

      stateElements.forEach(entry => {
        const showElement = entry.state === this._model._state.page;
        document.getElementById(entry.id).style.display = showElement ? 'block' : 'none';
      });
    }

    toggleSaveControls(show) {
      document.getElementById('userName').style.display = show ? 'block' : 'none';
      document.getElementById('storeUserName').style.display = show ? 'block' : 'none';
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.GameView = GameView;
})(window);