'use strict';

(function () {
  const startButton = document.getElementById('start');
  const title = document.getElementById('title');
  const userName = document.getElementById('userName');
  const storeUserNameButton = document.getElementById('storeUserName');
  const gameObj = document.getElementById('game');
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const wrapper = document.getElementById('wrapper');

  wrapper.style.width = `${window.innerWidth}px`;
  wrapper.style.height = `${window.innerHeight}px`;
  wrapper.style.backgroundImage = 'url(bg.jpg)';
  wrapper.style.backgroundSize = `${window.innerWidth}px ${window.innerHeight}px`;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'absolute';

  let units = [];
  let bases = [];

  let playing = false;
  const frequency = 15;
  const generateSpeed = frequency * 250;
  let timeGame = 0;

  const scores = {
    scores: 0,
    update() {
      const scoresObj = document.getElementById('scores');
      scoresObj.textContent = `${this.scores}`;
    },
  };

  function Base(t, l, w, h) {
    const self = this;
    self.sizeX = window.innerWidth * w / 100;
    self.sizeY = window.innerHeight * h / 100;
    self.posX = (window.innerWidth * w / 100) / 2 + window.innerWidth * l / 100;
    self.posY = (window.innerHeight * h / 100) / 2 + window.innerHeight * t / 100;
    function createBase() {
      const baseObj = document.createElement('div');
      baseObj.style.position = 'absolute';
      baseObj.style.backgroundColor = '#5860f0';
      baseObj.style.borderRadius = '20px';
      baseObj.style.width = `${w}%`;
      baseObj.style.height = `${h}%`;
      baseObj.style.left = `${l}%`;
      baseObj.style.top = `${t}%`;
      gameObj.appendChild(baseObj);
      self.obj = baseObj;
    }
    createBase();
  }

  // конструктор юнитов
  function Unit() {
    const self = this;
    self.unitSize = 50;
    self.speed = 1;
    self.way = [];
    self.onBase = false;

    function setRandomPos() {
      const random = Math.random();
      const perimeter = window.innerWidth * 2 + window.innerHeight * 2;
      if (perimeter * random < window.innerWidth) {
        self.posX = perimeter * random;
        self.posY = 0;
      } else if (perimeter * random < window.innerWidth + window.innerHeight) {
        self.posX = window.innerWidth - self.unitSize;
        self.posY = perimeter * random - window.innerWidth;
      } else if (perimeter * random < window.innerWidth * 2 + window.innerHeight) {
        self.posX = window.innerWidth * 2 + window.innerHeight - perimeter * random;
        self.posY = window.innerHeight - self.unitSize;
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

    function createPlane() {
      const planeObj = document.createElement('img');
      planeObj.src = 'plane.svg';
      planeObj.style.position = 'absolute';
      planeObj.style.width = `${self.unitSize}px`;
      planeObj.style.height = `${self.unitSize}px`;
      planeObj.style.transform = 'translate(-50%, -50%)';
      wrapper.appendChild(planeObj);
      self.obj = planeObj;
    }

    self.update = function () {
      const sin = self.speedX / Math.sqrt(self.speedX * self.speedX + self.speedY * self.speedY);
      let angle = Math.asin(sin) * 180 / Math.PI;
      if (self.speedY > 0) {
        angle = 180 - angle;
      }

      self.obj.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      self.obj.style.left = self.posX + 'px';
      self.obj.style.top = self.posY + 'px';
    };

    setRandomPos();
    setRandomDirection();
    createPlane();
  }

  bases.push(new Base(29.7, 33, 8, 9));

  function startGame() {
    if (playing === false) {
      playing = true;
    }

    document.addEventListener('mousedown', startSetWay, false);

    units.forEach(unit => unit.obj.remove());
    units = [];
    scores.scores = 0;

    console.log(bases);
  }

  startButton.addEventListener('click', startGame, false);

  setInterval(game, frequency);

  function game() {
    if (playing) {
      timeGame += frequency;
      if (timeGame % generateSpeed === 0 || timeGame === frequency) {
        generateUnit();
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      units.forEach((unit, index) => {
        posBall(unit);
        drawWay(unit);
        unitOnBase(unit, index);
      });
      scores.update();
      findCrash();
    }
  }

  // генерируем юниты
  function generateUnit() {
    units.push(new Unit());
  }

  // Изменяем положение обьектов
  function posBall(elem) {
    let cutLength;
    let sin;
    let cos;
    const posEnd = elem.way[0];

    if (!elem.way.length) {
      elem.posX += elem.speedX;
      elem.posY += elem.speedY;
    } else {
      cutLength = Math.sqrt((posEnd[0] - elem.posX) * (posEnd[0] - elem.posX)
        + (posEnd[1] - elem.posY) * (posEnd[1] - elem.posY));
      sin = (posEnd[0] - elem.posX) / cutLength;
      cos = (posEnd[1] - elem.posY) / cutLength;
      if (cutLength > elem.speed) {
        elem.speedX = sin * elem.speed;
        elem.speedY = cos * elem.speed;
        elem.posX += elem.speedX;
        elem.posY += elem.speedY;
      } else {
        if (elem.way.length === 1) {
          elem.way.shift();
          elem.posX += elem.speedX;
          elem.posY += elem.speedY;
        } else {
          const posStart = elem.way.shift();
          const remained = elem.speed - cutLength;
          cutLength = Math.sqrt((posEnd[0] - elem.posX) * (posEnd[0] - elem.posX)
            + (posEnd[1] - elem.posY) * (posEnd[1] - elem.posY));
          sin = (posEnd[0] - posStart[0]) / cutLength;
          cos = (posEnd[1] - posStart[1]) / cutLength;
          elem.posX = posStart[0] + sin * remained;
          elem.posY = posStart[1] + cos * remained;
        }
      }
    }

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

  let target;

  function startSetWay(event) {
    event = event || window.event;
    event.preventDefault();

    units.forEach(unit => {
      if (event.target === unit.obj) {
        unit.onBase = false;
        unit.way = [];
        target = unit;
        document.addEventListener('mousemove', setWay);
      }
    });
    document.addEventListener('mouseup', () => document.removeEventListener('mousemove', setWay));
  }

  // сетаем координаты
  function setWay(e) {
    e = e || window.event;
    e.preventDefault();
    let x = e.pageX;
    let y = e.pageY;
    target.way.push([x, y]);
    if (Math.abs(x - bases[0].posX) < bases[0].sizeX / 4 && Math.abs(y - bases[0].posY) < bases[0].sizeY / 4) {
      target.onBase = true;
      document.removeEventListener('mousemove', setWay);
    }
  }

  // рисуем путь юнита
  function drawWay(unit) {
    if (unit.way.length) {
      if (unit.onBase) {
        ctx.strokeStyle = 'grey';
      } else {
        ctx.strokeStyle = 'black';
      }
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(unit.posX, unit.posY);
      unit.way.forEach(pos => ctx.lineTo(pos[0], pos[1]));
      ctx.stroke();
    }
  }

  // поиск сталкновений
  function findCrash() {
    const length = units.length;
    for (let i = 0; i < length; i++) {
      for (let j = i + 1; j < length; j++) {
        const distX = Math.abs(units[j].posX - units[i].posX);
        const distY = Math.abs(units[j].posY - units[i].posY);
        const ultraDist = units[i].unitSize / 2 + units[j].unitSize / 2;
        if (distX < ultraDist && distY < ultraDist) {
          gameover();
        }
      }
    }
  }

  function gameover() {
    playing = false;

    toggleSaveControls(true);

    document.removeEventListener('mousedown', startSetWay, false);
    title.innerHTML = `Игра окончена! (Вы набрали: ${Math.round(scores.scores)} очков)`;
    location.hash = encodeURIComponent(JSON.stringify({ page: 'menu' }));
  }

  storeUserNameButton.addEventListener('click', storeUserNameButtonHandler, false);

  function storeUserNameButtonHandler(e) {
    e.preventDefault(e);
    records.addNewResult(userName.value, scores.scores);
    toggleSaveControls(false);
  }

  function toggleSaveControls(show) {
    userName.style.display = show ? 'block' : 'none';
    storeUserNameButton.style.display = show ? 'block' : 'none';
  }

  function unitOnBase(unit, index) {
    if (unit.onBase && unit.way.length === 0) {
      unit.obj.remove();
      units.splice(index, 1);
      scores.scores += 1;
    }
  }
})();
