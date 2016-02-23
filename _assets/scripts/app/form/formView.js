(function (window) {

    'use strict';

    // constructor
    // @param {string} [formId] html id of form element
    var AppFormView = function (formId) {
        this._containerEl = document.getElementById(formId);
    };

    // Binds  form submitting.
    // @param {string} [submitButtonId] id of submit button
    AppFormView.prototype.bindSubmit = function (submitButtonId) {

    };

    // Binds to events on input.
    // @param {object} [input] input properties data
    AppFormView.prototype.bindInput = function (input) {

    };

    // Refreshes input view state.
    // @param {object} [input] input properties data
    AppFormView.prototype.refreshInputState = function (input) {

    };

    // export to app
    window.app = window.app || {};
    window.app.form = window.app.form || {};
    window.app.form.view = AppFormView;

})(window);
