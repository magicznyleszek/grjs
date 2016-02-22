(function (window) {

    'use strict';


    // Crate a new app.
    // @param {object} [properties] a list of properties:
    // - @property {string} [notifierId] html id of notifications container
    // - @property {string} [storageId] a prefix for storage cache
    // - @property {object} [form] a form object with properties
    // - - @property {string} [id] html id of form container
    // - - @property {array} [fields] a list of form fields
    // - - - @element {object} a form element object with properties
    // - - - - @property {string} [name] form field input name
    // - - - - @property {string} [type] validation type
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
            new app.form.view(),
            this.broadcaster,
            properties.form
        );
    }

    window.addEventListener('load', function () {
        window.grjs = new App({
            notifierId: 'notifierContainer',
            storageId: 'grjs',
            form: {
                id: 'promoForm',
                fields: [
                    {
                        name: 'amount-1',
                        type: null
                    },
                    {
                        name: 'amount-5',
                        type: null
                    },
                    {
                        name: 'firstName',
                        type: 'person'
                    },
                    {
                        name: 'lastName',
                        type: 'person'
                    },
                    {
                        name: 'messageOne',
                        type: 'text10'
                    },
                    {
                        name: 'messageTwo',
                        type: 'text20'
                    },
                    {
                        name: 'email',
                        type: 'email'
                    },
                    {
                        name: 'pass',
                        type: 'password'
                    },
                    {
                        name: 'vid',
                        type: 'vid'
                    },
                    {
                        name: 'counter',
                        type: 'counter20'
                    }
                ]
            }
        });
    });

})(window);
