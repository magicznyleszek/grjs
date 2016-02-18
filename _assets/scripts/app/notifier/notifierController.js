(function (window) {

    'use strict';

    // constructor
    var AppNotifierController = function () {};

    // export to app
    window.app = window.app || {};
    window.app.notifier = window.app.notifier || {};
    window.app.notifier.controller = new AppNotifierController;

})(window);
