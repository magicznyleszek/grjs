(function (window) {

    'use strict';

    function Notifier(containerId) {
        this.model = new app.notifier.Notification();
        this.view = new app.notifier.view(containerId);
        this.controller = new app.notifier.controller(this.model, this.view);
    }

    window.addEventListener('load', function () {
        var grjsNotifier = new Notifier('notifierContainer');
    });

})(window);
