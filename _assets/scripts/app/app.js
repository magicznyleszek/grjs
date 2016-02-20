(function (window) {

    'use strict';

    function App(properties) {
        this.broadcaster = new app.broadcaster(new app.actions);
        this.validator = new app.validator();
        this.storage = new app.storage(properties.storageId);
        this.notifier = new app.notifier.controller(
            new app.notifier.Notification(),
            new app.notifier.view(properties.notifierId),
            this.broadcaster
        );
    }

    window.addEventListener('load', function () {
        window.grjs = new App({
            notifierId: 'notifierContainer',
            storageId: 'grjs'
        });
    });

})(window);
