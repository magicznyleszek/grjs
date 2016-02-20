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
        this.form = new app.form.controller(
            new app.form.Input(),
            new app.form.view(formId),
            this.broadcaster
        );
    }

    window.addEventListener('load', function () {
        window.grjs = new App({
            notifierId: 'notifierContainer',
            formId: 'promoForm',
            storageId: 'grjs'
        });
    });

})(window);
