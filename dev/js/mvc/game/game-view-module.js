(function (window) {

  class GameView {
    constructor(model, stateElements, { canvas, wrapper }) {
      this._model = model;
      this._canvas = canvas;
      this._wrapper = wrapper;
      this._stateElements = stateElements;
      this._ctx = this._canvas.getContext('2d');
    }

    clearCanvas() {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    update() {
      this._wrapper.style.width = `${window.innerWidth}px`;
      this._wrapper.style.height = `${window.innerHeight}px`;
      this._wrapper.style.backgroundImage = 'url(img/bg.jpg)';
      this._wrapper.style.backgroundSize = `${window.innerWidth}px ${window.innerHeight}px`;

      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;
      this._canvas.style.position = 'absolute';
    }

    changePage(state) {
      document.getElementsByTagName('title')[0].innerHTML = `${state.page} | Air control`;

      this._stateElements.forEach(entry => {
        const showElement = entry.state === state.page;
        document.getElementById(entry.id).style.visibility = showElement ? 'visible' : 'hidden';
        document.getElementById(entry.id).style.opacity = showElement ? '1' : '0';
      });
    }

    toggleSaveControls(show) {
      document.getElementById('userName').style.display = show ? 'block' : 'none';
      document.getElementById('storeUserName').style.display = show ? 'block' : 'none';
    }

    writeScore(score){
      document.getElementById('title').innerHTML =
        `Игра окончена! (Вы набрали: ${score} очков)`;
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.GameView = GameView;
})(window);