'use strict';

(function () {
  const startButton = document.getElementById('start');
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const wrapper = document.getElementById('wrapper');

  let units = [];

  let playing = false;
  const frequency = 15;
  const generateSpeed = 4500000;
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
      if (timeGame % generateSpeed === 0 || timeGame === frequency) {
        generateUnit();
        generateUnit();
      }
      units.forEach(unit => posBall(unit));
    }
  }
  // конструктор юнитов
  function Unit() {
    const self = this;
    const unitSize = 50;
    self.speed = 0.5;
    self.way = [];

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
      self.speedY = Math.random() * (self.speed + self.speed / 3) - self.speed / 3;
      self.speedX = Math.sqrt(self.speed * self.speed - self.speedY * self.speedY);
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

  // Изменяем положение обьектов

  function posBall(elem) {
    let cutLength;
    let sin;
    let cos;
    let posEnd;


    if (elem.way.length) {
      posEnd = elem.way[0];
      cutLength = Math.sqrt((posEnd[0] - elem.posX) * (posEnd[0] - elem.posX)
        + (posEnd[1] - elem.posY) * (posEnd[1] - elem.posY));
      sin = (posEnd[0] - elem.posX) / cutLength;
      cos = (posEnd[1] - elem.posY) / cutLength;
      if (elem.speed < cutLength) {
        elem.speedX = sin * elem.speed;
        elem.speedY = cos * elem.speed;
      } else {
        let posStart = elem.way.shift();
        if (elem.way.length) {
          posEnd = elem.way[0];
          cutLength = Math.sqrt((posEnd[0] - elem.posX) * (posEnd[0] - elem.posX)
            + (posEnd[1] - elem.posY) * (posEnd[1] - elem.posY));
          sin = (posEnd[0] - posStart[0]) / cutLength;
          cos = (posEnd[1] - posStart[1]) / cutLength;
          elem.speedX = sin * (cutLength - elem.speed);
          elem.speedX = cos * (cutLength - elem.speed);
        }
      }
    }

    elem.posX += elem.speedX;
    elem.posY += elem.speedY;

    if (elem.posX < 0) {
      elem.speedX *= -1;
    }
    if (elem.posX > window.innerWidth) {
      elem.speedX *= -1;
    }
    if (elem.posY < 0) {
      elem.speedY *= -1;
    }
    if (elem.posY > window.innerHeight) {
      elem.speedY *= -1;
    }
    elem.update();
  }
  // добавление траектории
  document.addEventListener('mousedown', (event) => {
    event = event || window.event;
    event.preventDefault();

    units.forEach(unit => {
      if (event.target === unit.obj) {
        document.addEventListener('mousemove', setWay);
      }
    });
    document.addEventListener('mouseup', () => {document.removeEventListener('mousemove', setWay)});
  });

  function setWay(e) {
    e = e || window.event;
    e.preventDefault();
    let x = e.pageX;
    let y = e.pageY;
    unit.way.push([x, y]);
  }
})();



