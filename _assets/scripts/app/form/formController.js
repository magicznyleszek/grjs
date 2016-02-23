(function (window) {

    'use strict';

    // constructor
    // @param {object} [model] controller model
    // @param {object} [view] controller view
    // @param {object} [broadcaster] global event handler
    // @param {object} [form] form settings
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

        this._model = model;
        this._view = view;
        this._broadcaster = broadcaster;
        this._formData = form;
    };

    // export to app
    window.app = window.app || {};
    window.app.form = window.app.form || {};
    window.app.form.controller = AppFormController;

})(window);
