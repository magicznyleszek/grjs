(function (window) {

    'use strict';

    // constructor
    var AppInput = function (validator) {
        // safety checks
        if (validator === undefined) {
            throw new Error('Tried to create validatorless model.');
        }

        this.validator = validator;

        // a list of validator types (functions)
        this._validateTypes = {
            person: function (string) {
                var isNonEmpty = this.validator.testLengthOver(string, 0);
                var hasNoDigits = this.validator.testHasNoDigits(string);
                return isNonEmpty && hasNoDigits;
            },
            text10: function (string) {
                var isNonEmpty = this.validator.testLengthOver(string, 0);
                var isUnder11 = this.validator.testLengthUnder(string, 11);
                return isNonEmpty && isUnder11;
            },
            text20: function (string) {
                var isNonEmpty = this.validator.testLengthOver(string, 0);
                var isUnder21 = this.validator.testLengthUnder(string, 21);
                return isNonEmpty && isUnder21;
            },
            email: function (string) {
                return this.validator.testEmail(string);
            },
            password: function (string) {
                var isOver7 = this.validator.testLengthUnder(string, 7);
                var hasDigits = this.validator.testHasDigits(string);
                var hasLetters = this.validator.testHasLetters(string);
                var hasSpecials = this.validator.testHasSpecials(string);
                return isOver7 && hasDigits && hasLetters && hasSpecials;
            },
            vid: function (string) {
                var isNonEmpty = this.validator.testLengthOver(string, 0);
                var isUnder6 = this.validator.testLengthUnder(string, 6);
                var hasOnlyDigits = this.validator.testHasOnlyDigits(string);
                return isNonEmpty && isUnder6 && hasOnlyDigits;
            },
            counter20: function (number) {
                number = parseInt(number);
                var isNonEmpty = this.validator.testLengthOver(number, 0);
                var isInRange = this.validator.testNumberRange(number, 1, 20);
                return isNonEmpty && isInRange;
            }
        };
    };


    // export to app
    window.app = window.app || {};
    window.app.form = window.app.form || {};
    window.app.form.Input = AppInput;

})(window);
