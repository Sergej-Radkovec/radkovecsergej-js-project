(function (window) {

  class RecordsView {
    constructor(model, recordsConteinerID) {
      this._model = model;
      this._conteiner = recordsConteinerID;
    }

    showTable() {
      let pageHTML = `
        <table>
          <tr>
            <th>Место</th><th>Имя игрока</th><th>Очки</th>
          </tr>
          ${
            this._model._recordStorage.map((line, i) => `
               <tr>
                <td>${(i + 1)}</td>
                <td class="userName">${line.name}</td>
                <td class="userScore">${line.score}</td>
              </tr>
            `).join('')
          }
          </table>`;
      $(`#${this._conteiner}`).empty().append(pageHTML);
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.RecordsView = RecordsView;
})(window);