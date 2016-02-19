(function (window) {

    'use strict';

    // constructor
    var AppNotifierView = function () {
        this._containerId = 'notifierContainer';
        this._containerEl = document.getElementById(this._containerId);
    };

    // Add child node to container.
    // @param {object} [element] node to be added
    AppNotifierView.prototype.add = function (element) {
        this._containerEl.appendChild(element);
    };

    // Remove child node from container by it's id.
    // @param {string} [id] of node to be removed
    AppNotifierView.prototype.remove = function (id) {
        var targetEl = document.getElementById(id);
        this._containerEl.removeChild(targetEl);
    };

    // export to app
    window.app = window.app || {};
    window.app.notifier = window.app.notifier || {};
    window.app.notifier.view = new AppNotifierView();

})(window);
