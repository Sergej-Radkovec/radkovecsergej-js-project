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

  switch(state.page) {
    case 'menu':

      break;
    case 'game':
      document.getElementById('menu').style.display = 'none';
      break;
    case 'records':

      break;
  }
}

function switchToState(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}
function switchToMenu() {
  switchToState({page: 'menu'});
}
function switchToGame() {
  switchToState({page: 'game'});
}
function switchToRecords() {
  switchToState({page: 'records'});
}

renderNewState();
