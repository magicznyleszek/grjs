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

        this._formId = form.id;
        this._containerEl = document.getElementById(this._formId);
        this._broadcaster = broadcaster;
        this._stateAttrs = {
            empty: 'data-state-empty',
            focused: 'data-state-focused',
            valid: 'data-state-valid'
        };
    };

    // Returns dom input element.
    // @param {string} [name] name attribute of input element
    AppFormView.prototype._findInputEl = function (name) {
        return this._containerEl.querySelector('*[name="' + name + '"]');
    };

    // Binds  form submitting.
    // @param {string} [submitButtonId] id of submit button
    AppFormView.prototype.bindSubmit = function (submitButtonId) {
        var self = this;
        var buttonEl = this._containerEl.querySelector('*[id="' + submitButtonId + '"]');

        buttonEl.addEventListener('click', function () {
            self._broadcaster.publish(
                self._broadcaster.actions.formSubmitted,
                { id: self._formId }
            );
        });
    };

    // Binds to events on input.
    // @param {object} [input] input properties data
    AppFormView.prototype.bindInput = function (input) {
        var self = this;
        var inputName = input.name;
        var inputEl = this._findInputEl(inputName);

        inputEl.addEventListener('input', function () {
            self._broadcaster.publish(
                self._broadcaster.actions.formInputValueChanged,
                { name: inputName, value: inputEl.value }
            );
        });
        inputEl.addEventListener('focus', function () {
            self._broadcaster.publish(
                self._broadcaster.actions.formInputFocusChanged,
                { name: inputName, isFocused: true }
            );
        });
        inputEl.addEventListener('blur', function () {
            self._broadcaster.publish(
                self._broadcaster.actions.formInputFocusChanged,
                { name: inputName, isFocused: false }
            );
        });

        this.refreshInputState(input);
    };

    // Refreshes input view state.
    // @param {object} [input] input properties data
    AppFormView.prototype.refreshInputState = function (input) {
        var inputEl = this._findInputEl(input.name);

        if (input.isEmpty) {
            inputEl.setAttribute(this._stateAttrs.empty, '');
        } else {
            if (inputEl.hasAttribute(this._stateAttrs.empty)) {
                inputEl.removeAttribute(this._stateAttrs.empty);
            }
        }

        if (input.isFocused) {
            inputEl.setAttribute(this._stateAttrs.focused, '');
        } else {
            if (inputEl.hasAttribute(this._stateAttrs.focused)) {
                inputEl.removeAttribute(this._stateAttrs.focused);
            }
        }

        if (input.isValid) {
            inputEl.setAttribute(this._stateAttrs.valid, '');
        } else {
            if (inputEl.hasAttribute(this._stateAttrs.valid)) {
                inputEl.removeAttribute(this._stateAttrs.valid);
            }
        }
    };

    // export to app
    window.app = window.app || {};
    window.app.form = window.app.form || {};
    window.app.form.view = AppFormView;

})(window);
