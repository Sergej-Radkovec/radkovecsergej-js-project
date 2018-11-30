
(function (window) {
  'use strict';

  class Events {
    constructor(sender) {
      this._sender = sender;
      this._listeners = [];
    }

    clearLesteners() {
      this._listeners = [];
    }

    attach(listener) {
      this._listeners.push(listener);
    }

    notify(args) {
      this._listeners.forEach((listener, index) => {
        this._listeners[index](this._sender, args)
      });
    }
  }

  window.airPlaneMVC = window.airPlaneMVC || {};
  window.airPlaneMVC.Events = Events;
})(window);
