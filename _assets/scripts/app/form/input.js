(function (window) {

    'use strict';

    // constructor
    var AppInput = function (validator) {
        var selfValidator = null;

        // safety checks
        if (validator === undefined) {
            throw new Error('Tried to create validatorless model.');
        }

        var selfValidator = validator;

        // a list of validator types (functions)
        this._validateTypes = {
            person: function () {
                var string = this.value;
                var isNonEmpty = selfValidator.testLengthOver(string, 0);
                var hasNoDigits = selfValidator.testHasNoDigits(string);
                return isNonEmpty && hasNoDigits;
            },
            text10: function () {
                var string = this.value;
                var isNonEmpty = selfValidator.testLengthOver(string, 0);
                var isUnder11 = selfValidator.testLengthUnder(string, 11);
                return isNonEmpty && isUnder11;
            },
            text20: function () {
                var string = this.value;
                var isNonEmpty = selfValidator.testLengthOver(string, 0);
                var isUnder21 = selfValidator.testLengthUnder(string, 21);
                return isNonEmpty && isUnder21;
            },
            email: function () {
                var string = this.value;
                return selfValidator.testEmail(string);
            },
            password: function () {
                var string = this.value;
                var isOver7 = selfValidator.testLengthOver(string, 7);
                var hasDigits = selfValidator.testHasDigits(string);
                var hasLetters = selfValidator.testHasLetters(string);
                var hasSpecials = selfValidator.testHasSpecials(string);
                return isOver7 && hasDigits && hasLetters && hasSpecials;
            },
            vid: function () {
                var string = this.value;
                var isNonEmpty = selfValidator.testLengthOver(string, 0);
                var isUnder6 = selfValidator.testLengthUnder(string, 6);
                var hasOnlyDigits = selfValidator.testHasOnlyDigits(string);
                return isNonEmpty && isUnder6 && hasOnlyDigits;
            },
            counter20: function () {
                var string = this.value;
                var number = parseInt(string);
                var isNonEmpty = selfValidator.testLengthOver(string, 0);
                var isInRange = selfValidator.testNumberRange(number, 1, 20);
                return isNonEmpty && isInRange;
            }
        };
    };

    // Creates an input instance.
    // @param {string} [name] name of the input
    // @param {string} [type] validate type to match function with
    // @param {bool} [liveValidated] for marking input as live validating
    AppInput.prototype.create = function (name, type, liveValidated) {
        var validateFunc = this._validateTypes[type];

        // safety checks
        if (name === undefined) {
            throw new Error('Tried to create nameless input.');
        }
        if (validateFunc === undefined) {
            validateFunc = function () { return true; }
        }

        return {
            name: name,
            value: '',
            validate: validateFunc,
            isLiveValidated: liveValidated,
            isEmpty: true,
            isFocused: false,
            isValid: false
        };
    };

    // export to app
    window.app = window.app || {};
    window.app.form = window.app.form || {};
    window.app.form.Input = AppInput;

})(window);
