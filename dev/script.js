'use strict';

(function () {
  const startButton = document.getElementById('start');
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const wrapper = document.getElementById('wrapper');

  let units = [];

  let playing = false;
  const frequency = 15;
  const generateSpeed = 4500;
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
      units.forEach(unit => posBall(unit));
    }
  }
  // конструктор юнитов
  function Unit() {
    const self = this;
    const unitSize = 50;
    const speed = 5;

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
// временно создаем шарик вместо самолёта


    function createBall() {
      const ballObj = document.createElement('div');
      ballObj.style.position = 'absolute';
      ballObj.style.backgroundColor = '#F02137';
      ballObj.style.borderRadius = '50%';
      ballObj.style.width = 50 + 'px';
      ballObj.style.height = 50 + 'px';
      wrapper.appendChild(ballObj);
      self.obj = ballObj;
    }

    self.update = function () {
      self.obj.style.left = self.posX + 'px';
      self.obj.style.top = self.posY + 'px';
    };

    setRandomPos();
    setRandomDirection();
    createBall();
  }
  // генерируем юниты
  function generateUnit() {
    units.push(new Unit());
    units.forEach(value => value.update());
  }

  //Изменяем положение обьектов без задания траектории

  function posBall(elem) {
    elem.posX += elem.speedX;
    if (elem.posX < 0) {
      elem.speedX *= -1;
    }
    if (elem.posX > window.innerWidth) {
      elem.speedX *= -1;
    }
    elem.posY += elem.speedY;
    if (elem.posY < 0) {
      elem.speedY *= -1;
    }
    if (elem.posY > window.innerHeight) {
      elem.speedY *= -1;
    }
    elem.update();
  }

})();
