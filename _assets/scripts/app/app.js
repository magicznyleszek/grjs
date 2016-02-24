(function (window) {

    'use strict';


    // Crate a new app.
    // @param {object} [properties] a list of properties:
    // - @property {string} [notifierId] html id of notifications container
    // - @property {string} [storageId] a prefix for storage cache
    // - @property {object} [form] a form object with properties
    // - - @property {string} [id] html id of form container
    // - - @property {string} [submitId] html id of form submit button
    // - - @property {array} [fields] a list of form fields
    // - - - @element {object} a form element object with properties
    // - - - - @property {string} [name] form field input name
    // - - - - @property {string} [type] validation type
    // - - - - @property {bool} [liveValidate] turns live validation on
    function App(properties) {
        this.broadcaster = new app.broadcaster(new app.actions());
        this.storage = new app.storage(
            properties.storageId,
            this.broadcaster
        );
        this.notifier = new app.notifier.controller(
            new app.notifier.Notification(),
            new app.notifier.view(properties.notifierId),
            this.broadcaster
        );
        this.form = new app.form.controller(
            new app.form.Input(new app.validator()),
            new app.form.view(this.broadcaster, properties.form),
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
                submitId: 'promoForm-registerButton',
                fields: [
                    {
                        name: 'amount-1',
                        type: null,
                        liveValidate: false
                    },
                    {
                        name: 'amount-5',
                        type: null,
                        liveValidate: false
                    },
                    {
                        name: 'firstName',
                        type: 'person',
                        liveValidate: false
                    },
                    {
                        name: 'lastName',
                        type: 'person',
                        liveValidate: false
                    },
                    {
                        name: 'messageOne',
                        type: 'text10',
                        liveValidate: true
                    },
                    {
                        name: 'messageTwo',
                        type: 'text20',
                        liveValidate: true
                    },
                    {
                        name: 'email',
                        type: 'email',
                        liveValidate: false
                    },
                    {
                        name: 'pass',
                        type: 'password',
                        liveValidate: false
                    },
                    {
                        name: 'vid',
                        type: 'vid',
                        liveValidate: true
                    },
                    {
                        name: 'counter',
                        type: 'counter20',
                        liveValidate: false
                    }
                ]
            }
        });
    });

})(window);
