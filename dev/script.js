'use strict';

(function () {
  const startButton = document.getElementById('start');
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');

  let units = [];

  let playing = false;
  const frequency = 25;
  const generateSpeed = 5000;
  let timeGame = 0;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function startGame() {
    startButton.style.display = 'none';
    if (playing === false) {
      playing = true;
    }
  }

  startButton.addEventListener('click', startGame, false);

  setInterval(game, frequency);

  function game() {
    if (playing) {
      timeGame += frequency;
      if (timeGame % generateSpeed === 0) {
        generateUnit();
        console.log(units);
      }
    }
  }
  // конструктор юнитов
  function Unit() {
    const self = this;
    const unitSize = 10;
    const speed = 10;

    function setRandomPos() {
      const random = Math.random();
      const perimeter = window.innerWidth * 2 + window.innerHeight * 2;
      if (perimeter * random < window.innerWidth) {
        self.posX = perimeter * random;
        self.posY = 0;
      } else if (perimeter * random < window.innerWidth + window.innerHeight) {
        self.posX = window.innerWidth - unitSize;
        self.posY = perimeter * random - window.innerWidth;
      } else if (perimeter * random < window.innerWidth * 2 + window.innerHeight) {
        self.posX = window.innerWidth * 2 + window.innerHeight - perimeter * random;
        self.posY = window.innerHeight - unitSize;
      } else {
        self.posX = 0;
        self.posY = perimeter - perimeter * random;
      }
    }

    function setRandomDirection() {
      self.speedY = Math.random() * (speed + speed / 3) - speed / 3;
      self.speedX = Math.sqrt(speed * speed - self.speedY * self.speedY);
      if (Math.random() > 0.5) {
        self.speedX *= -1;
      }
      if (self.posX > window.innerWidth) {
        self.speedX *= -1;
      }
      if (self.posY > window.innerHeight) {
        self.speedY *= -1;
      }
    }

    setRandomPos();
    setRandomDirection();
  }
  // генерируем юниты
  function generateUnit() {
    units.push(new Unit());
  }

})();
