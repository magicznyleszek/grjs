(function (window) {

    'use strict';

    // constructor
    var AppFormController = function () {
        this._validatorTypes = {
            person: function () {},
            text10: function () {},
            text20: function () {},
            email: function () {},
            password: function () {},
            vid: function () {},
            counter20: function () {}
        };
    };

    // export to app
    window.app = window.app || {};
    window.app.form = window.app.form || {};
    window.app.form.controller = AppFormController;

})(window);
