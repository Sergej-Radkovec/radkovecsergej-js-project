(function (window) {
  'use strict';

  class HelicopterView extends window.airPlaneMVC.VehicleView {

    drow() {
      const size = this._model.unitSize;
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
      let size = this._model.unitSize;
      blades.forEach((elem) => {
        const deggreBlade = elem.transform.animVal[0].angle;
        elem.setAttribute('transform', `rotate(${deggreBlade + 6} ${size / 2} ${size / 2})`);
      });
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.HelicopterView = HelicopterView;
})(window);
