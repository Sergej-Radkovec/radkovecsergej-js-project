'use strict';

const records = new function () {
  const stringName = 'RADKOVEC_AIRCONTROL_RECORDS';
  const ajaxHandlerScript = 'http://fe.it-academy.by/AjaxStringStorage2.php';
  const recordsLength = 10;
  let password;
  let userName;
  let score;
  let recordStorage;

  function loadRecords() {
    loadStorage(readReady);
  }

  function addRecordToTable() {
    let addPossible = false;
    let userScoreExists;
    const userResult = {
      name: userName,
      score,
    };
    // пытаемся найти в таблице результат этого игрока
    const existingUserScore = recordStorage.filter(result => userName === result.name);
    userScoreExists = existingUserScore.length > 0;

    // (если нашли) проверям, набрал ли он больше очков, чем в прошлый раз
    if (userScoreExists) {
      if (existingUserScore[0].score < score) {
        // (если да) перезаписываем его очки
        addPossible = true;
        existingUserScore[0].score = score;
      } // (если не нашли) проверяем, есть ли в таблице свободное место
    } else if (recordStorage.length < recordsLength) {
    // (если да) записываем результат в конец таблицы
      recordStorage.push(userResult);
      addPossible = true;
      // (если нет) сверяем очки игрока с последним результатом)
    } else if (recordStorage[recordStorage.length - 1].score < score) {
      // (если у игрока больше) записываем результат игрока вместо последнего результата
      recordStorage[recordStorage.length - 1] = userResult;
      addPossible = true;
    }
    // сортируем таблицу и вызываем updateStorage
    recordStorage.sort(compare);
    updateStorage();
    return addPossible;
  }

  function updateStorage() {
    $.ajax({
      url: ajaxHandlerScript,
      type: 'POST',
      data: {
        f: 'UPDATE', n: stringName,
        v: JSON.stringify(recordStorage), p: password,
      },
      cache: false,
      success: updateReady,
      error: errorHandler
    });
  }

  function loadStorage() {
    $.ajax({
      url: ajaxHandlerScript,
      type: 'POST',
      data: { f: 'READ', n: stringName },
      cache: false,
      success: readReady,
      error: errorHandler
    });
  }

  function readReady(ResultH) {
    if (ResultH.error !== undefined) {
      alert(`Извините, таблицы рекордов временно недоступны.\n${ResultH.error}`);
    } else {
      recordStorage = tableFromString(ResultH.result);
      showTable();
    }
  }

  function showTable() {
    let pageHTML = '';
    let name;
    let score;
    pageHTML += '<table>';
    pageHTML += '<tr><th>Место</th><th>Имя игрока</th><th>Очки</th></tr>';

    for (let i = 0; i < recordStorage.length; i++) {
      name = recordStorage[i].name;
      score = recordStorage[i].score;
      pageHTML += `<tr><td>${(i + 1)}</td><td class="userName">${name}</td><td class="userScore">${score}</td></td></tr>`;
    }

    pageHTML += '</table>';
    $('#recordsTable').empty().append(pageHTML);
  }

  function addUsers() {
    password = Math.random();
    $.ajax({
      url: ajaxHandlerScript,
      type: 'POST',
      data: {f: 'LOCKGET', n: stringName, p: password},
      cache: false,
      success: lockGetReady,
      error: errorHandler
    });
  }

  function tableFromString(json) {
    let result = [];
    if (json !== '') {
      result = JSON.parse(json);
    }
    if (!(result instanceof Array)) {
      result = [];
    }
    return result;
  }

  function lockGetReady(ResultH) {
    if (ResultH.error != undefined) {
      alert(`Извините, таблицы рекордов временно недоступны.\n${ResultH.error}`);
    } else {
      recordStorage = tableFromString(ResultH.result);

      if (!addRecordToTable()) {
        alert('Вы набрали недостаточно очков для таблицы рекордов');
      }
    }
  }

  function updateReady(ResultH) {
    if (ResultH.error !== undefined) {
      alert(`Извините, таблицы рекордов временно недоступны.\n${ResultH.error}`);
    }
  }

  function errorHandler(jqXHR, StatusStr, ErrorStr) {
    alert(`Извините, таблицы рекордов временно недоступны.\n${StatusStr} ${ErrorStr}`);
  }

  function compare(A, B) {
    return B.score - A.score;
  }

  this.addNewResult = function (userNameToSave, scoreToSave) {
    userName = userNameToSave || 'Anonymous';
    score = Math.round(scoreToSave);
    addUsers();
  };

  this.getHighscores = function () {
    return loadRecords();
  };
};
