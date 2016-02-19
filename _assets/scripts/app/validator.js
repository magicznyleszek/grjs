(function (window) {

    'use strict';

    // constructor
    var AppValidator = function () {};

    // Checks if string contains any digit characters.
    // @param {string} [testString] string to be tested
    AppValidator.prototype.testHasDigits = function (testString) {
        var re = new RegExp('\\d', 'g');
        return re.test(testString);
    };

    // Checks if string contains any letter characters.
    // @param {string} [testString] string to be tested
    AppValidator.prototype.testHasLetters = function (testString) {
        var re = new RegExp('\\w', 'g');
        return re.test(testString);
    };

    // Checks if string contains any special characters.
    // @param {string} [testString] string to be tested
    AppValidator.prototype.testHasSpecials = function (testString) {
        return false;
    };

    // @param {string} [testString] string to be tested
    // @param {number} {}
    AppValidator.prototype.testLengthOver = function (testString) {
        return false;
    };

    // @param {string} [testString] string to be tested
    // @param {number} {}
    AppValidator.prototype.testLengthUnder = function (testString) {
        return false;
    };

    // @param {string} [testString] string to be tested
    // @param {number} {}
    AppValidator.prototype.testNumberRange = function (testString) {
        return false;
    };

    // @param {string} [testString] string to be tested
    // @param {number} {}
    AppValidator.prototype.testDigitsCount = function (testString) {
        return false;
    };

    // export to app
	window.app = window.app || {};
	window.app.validator = new AppValidator();

})(window);
