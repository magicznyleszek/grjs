(function (window) {

    'use strict';

    // constructor
    // @param {object} [broadcaster] global event handler
    // @param {object} [form] form settings
    var AppFormView = function (broadcaster, form) {
        // safety checks
        if (form === undefined) {
            throw new Error('Tried to create formless controller.');
        }
        if (broadcaster === undefined) {
            throw new Error('Tried to create broadcasterless controller.');
        }

        this._containerEl = document.getElementById(form.id);
        this._broadcaster = broadcaster;
    };

    // Returns dom input element.
    // @param {string} [name] name attribute of input element
    AppFormView.prototype._findInputEl = function (name) {
        return this._containerEl.querySelector('*[name=' + name + ']');
    };

    // Binds  form submitting.
    // @param {string} [submitButtonId] id of submit button
    AppFormView.prototype.bindSubmit = function (submitButtonId) {

    };

    // Binds to events on input.
    // @param {object} [input] input properties data
    AppFormView.prototype.bindInput = function (input) {
        // formInputValueChanged
        // formInputFocusChanged
        // var inputEl =
        // input.addEventListener('input', function() {
        //     console.log('input changed to: ', input.value);
        // });
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
