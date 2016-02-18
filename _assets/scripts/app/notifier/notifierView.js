(function (window) {

    'use strict';

    // constructor
    var AppNotifierView = function () {};

    // export to app
    window.app = window.app || {};
    window.app.notifier = window.app.notifier || {};
    window.app.notifier.view = new AppNotifierView;

})(window);
