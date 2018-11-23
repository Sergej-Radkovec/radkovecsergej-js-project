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
  wrapper.style.backgroundImage = 'url(img/bg.jpg)';
  wrapper.style.backgroundSize = `${window.innerWidth}px ${window.innerHeight}px`;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'absolute';

  let units = [];
  const bases = [];

  let playing = false;
  const frequency = 15;
  const generateSpeed = frequency * 200;
  let timeGame = 0;

  const planeSize = 80;
  const planeSpeed = 0.7;

  const helicopterSize = 80;
  const helicopterSpeed = 0.5;

  const scores = {
    scores: 0,
    update() {
      const scoresObj = document.getElementById('scores');
      scoresObj.textContent = `${this.scores}`;
    },
  };

  class Base {
    constructor(t, l, w, h, angle) {
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
        baseObj.style.opacity = 0;
        baseObj.style.transform = `rotate(${angle}deg`;
        gameObj.appendChild(baseObj);
        self.obj = baseObj;
      }

      createBase();
    }
  }

  // конструктор юнитов
  class Vehicle {
    constructor(size, speed) {
      this.way = [];
      this.onBase = false;
      this.unitSize = size;
      this.speed = speed;
    }

    culcRandomDirection() {
      const perimeter = window.innerWidth * 2 + window.innerHeight * 2;
      const randomPosition = Math.random() * perimeter;
      const randomAngle = Math.random() * 2 * Math.PI;

      this.speedX = this.speed * Math.cos(randomAngle);
      this.speedY = this.speed * Math.sin(randomAngle);

      if (randomPosition < window.innerWidth) {
        this.posX = randomPosition;
        this.posY = 0;
      } else if (randomPosition < window.innerWidth + window.innerHeight) {
        this.posX = window.innerWidth;
        this.posY = randomPosition - window.innerWidth;
      } else if (randomPosition < window.innerWidth * 2 + window.innerHeight) {
        this.posX = window.innerWidth * 2 + window.innerHeight - randomPosition;
        this.posY = window.innerHeight;
      } else {
        this.posX = 0;
        this.posY = perimeter - randomPosition;
      }
    }

    update() {
      const sin = this.speedX / Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
      let angle = Math.asin(sin) * 180 / Math.PI;
      if (this.speedY > 0) {
        angle = 180 - angle;
      }

      this.obj.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      this.obj.style.left = `${this.posX}px`;
      this.obj.style.top = `${this.posY}px`;
    }
  }

  class Plane extends Vehicle {
    constructor() {
      super(planeSize, planeSpeed);
    }

    drow() {
      const planeObj = document.createElement('img');
      planeObj.src = 'img/plane.svg';
      planeObj.style.position = 'absolute';
      planeObj.style.width = `${this.unitSize}px`;
      planeObj.style.height = `${this.unitSize}px`;
      planeObj.style.transform = 'translate(-50%, -50%)';
      wrapper.appendChild(planeObj);
      this.obj = planeObj;
    }
  }

  class Helicopter extends Vehicle {
    constructor() {
      super(helicopterSize, helicopterSpeed);
    }

    drow() {
      const size = this.unitSize;
      const heliObj = document.createElement('div');
      heliObj.id = 'heliSVG';
      heliObj.style.width = `${size}px`;
      heliObj.style.height = `${size * 1.24}px`;
      heliObj.style.position = 'absolute';
      wrapper.appendChild(heliObj);
      $(heliObj).svg(drawHeli);
      function drawHeli(svg) {
        svg.polyline(
          [[size * 0.34, size * 0.32], [size * 0.3, size * 0.34],
            [size * 0.3, size * 0.66], [size * 0.34, size * 0.68]],
          {
            fill: 'none', stroke: 'black', strokeWidth: size / 100, strokeLineCap: 'round',
          },
        );

        svg.polyline(
          [[size * 0.66, size * 0.32], [size * 0.7, size * 0.34],
            [size * 0.7, size * 0.66], [size * 0.66, size * 0.68]],
          {
            fill: 'none', stroke: 'black', strokeWidth: size / 100, strokeLineCap: 'round',
          },
        );

        svg.ellipse(size * 0.5, size * 0.5, size * 0.18, size * 0.26, { fill: '#FF754D' });

        svg.rect(size * 0.4, size * 0.28, size * 0.2, size * 0.1, size * 0.08, size * 0.08,
          { fill: '#294CCC' });

        const g = svg.group({ strokeWidth: 2, stroke: 'grey' });

        svg.line(g, size * 0.5, size * 0.5, size * 0.5, 0,
          {
            transform: `rotate(0 ${size * 0.5} ${size * 0.5})`
          });

        svg.line(g, size * 0.5, size * 0.5, size * 0.5, 0,
          {
            transform: `rotate(120 ${size * 0.5} ${size * 0.5})`
          });

        svg.line(g, size * 0.5, size * 0.5, size * 0.5, 0,
          {
            transform: `rotate(240 ${size * 0.5} ${size * 0.5})`
          });

        svg.circle(size * 0.5, size * 0.5, size * 0.03, { fill: '#B5FF67' });

        svg.line(size * 0.51, size * 1.16, size * 0.4, size * 1.16,
          {
            strokeWidth: size * 0.02, stroke: '#B5FF67', strokeLineCap: 'round',
          });

        svg.line(size * 0.42, size * 1.08, size * 0.42, size * 1.24,
          {
            strokeWidth: size * 0.01, stroke: 'grey',
          });

        svg.line(size * 0.5, size * 0.7, size * 0.5, size * 1.2,
          {
            strokeWidth: size * 0.05, stroke: '#B5FF67', strokeLineCap: 'round',
          });
      }
      this.obj = heliObj;
    }

    update() {
      super.update();
      let blades = Array.from(this.obj.querySelectorAll('g line'));
      let size = this.unitSize;
      blades.forEach((elem) => {
        const deggreBlade = elem.transform.animVal[0].angle;
        elem.setAttribute('transform', `rotate(${deggreBlade + 6} ${size / 2} ${size / 2})`);
      });
    }
  }

  bases.push(new Base(29.7, 33, 8, 9, 0));
  bases.push(new Base(64.3, 51.5, 8, 8.2, 139));

  function startGame() {
    if (playing === false) {
      playing = true;
    }

    units.forEach(unit => unit.obj.remove());
    units = [];
    scores.scores = 0;

    document.addEventListener('mousedown', startSetWay, false);
  }

  startButton.addEventListener('click', startGame, false);

  setInterval(game, frequency);

  function game() {
    if (playing) {
      timeGame += frequency;
      if (timeGame % generateSpeed === 0 || timeGame === frequency) {
        units.push(generateUnit());
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      units.forEach((unit, index) => {
        positionUnit(unit);
        drawWay(unit);
        unitOnBase(unit, index);
      });
      scores.update();
      findCrash();
    }
  }

  // генерируем юниты
  function generateUnit() {
    let generateUnit;

    if (Math.random() < 0.65) {
      generateUnit = new Plane();
    } else {
      generateUnit = new Helicopter();
    }

    generateUnit.culcRandomDirection();
    generateUnit.drow();
    return generateUnit;
  }

  // Изменяем положение обьектов
  function positionUnit(elem) {
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
      if (event.target === unit.obj || isDescendant(unit.obj, event.target)) {
        unit.onBase = false;
        unit.way = [];
        target = unit;
        document.addEventListener('mousemove', setWay);
      }
    });
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', setWay);
      bases.forEach(base => base.obj.style.opacity = 0);
    });
  }
  // Функция проверяющая являеться ли элемент пэрентом ждя другого элемента
  function isDescendant(parent, child) {
    let node = child.parentNode;
    while (node != null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  // сетаем координаты
  function setWay(e) {
    e = e || window.event;
    e.preventDefault();
    let x = e.pageX;
    let y = e.pageY;
    target.way.push([x, y]);
    bases.forEach(base => {
      base.obj.style.opacity = 0.5;
      if (Math.abs(x - base.posX) < base.sizeX / 4 && Math.abs(y - base.posY) < base.sizeY / 4) {
        target.onBase = true;
        document.removeEventListener('mousemove', setWay);
      }
    });
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
        const dist = Math.sqrt((units[j].posX - units[i].posX) * (units[j].posX - units[i].posX)
          + (units[j].posY - units[i].posY) * (units[j].posY - units[i].posY));
        const ultraDist = (units[i].unitSize / 2 + units[j].unitSize / 2) * 0.8;
        if (dist < ultraDist) {
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
