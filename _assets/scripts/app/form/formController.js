(function (window) {

    'use strict';

    // constructor
    var AppFormController = function (model, view, broadcaster, form) {
        // safety checks
        if (model === undefined) {
            throw new Error('Tried to create modelless controller.');
        }
        if (view === undefined) {
            throw new Error('Tried to create viewless controller.');
        }
        if (broadcaster === undefined) {
            throw new Error('Tried to create broadcasterless controller.');
        }
        if (form === undefined) {
            throw new Error('Tried to create formless controller.');
        }

        this.model = model;
        this.view = view;
        this.broadcaster = broadcaster;
        this._formData = form;
    };

    // export to app
    window.app = window.app || {};
    window.app.form = window.app.form || {};
    window.app.form.controller = AppFormController;

})(window);
