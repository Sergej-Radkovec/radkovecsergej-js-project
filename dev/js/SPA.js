'use strict';

window.onhashchange = renderNewState;
function renderNewState() {
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));

  if (state === '') {
    state = { page: 'menu' };
  } else {
    state = JSON.parse(state);
  }

  function changePage() {
    const stateElements = [
      { state: 'menu', id: 'menu' },
      { state: 'game', id: 'game' },
      { state: 'records', id: 'recordsMenu' }];

    stateElements.forEach(entry => {
      const showElement = entry.state === state.page;
      document.getElementById(entry.id).style.display = showElement ? 'block' : 'none';
    });
  }

  switch(state.page) {
    case 'menu':
      changePage();
      break;
    case 'game':
      changePage();
      break;
    case 'records':
      changePage();
      records.getHighscores();
      break;
  }
}

function switchToState(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}
function switchToMenu() {
  switchToState({ page: 'menu' });
}
function switchToGame() {
  switchToState({ page: 'game' });
}
function switchToRecords() {
  switchToState({ page: 'records' });
}

renderNewState();
