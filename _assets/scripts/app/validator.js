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

    // Check if string contains no digit characters.
    // @param {string} [testString] string to be tested
    AppValidator.prototype.testHasNoDigits = function (testString) {
        var re = new RegExp('^([^0-9]*)$', 'g');
        return re.test(testString);
    };

    // Check if string has only digit characters.
    // @param {string} [testString] string to be tested
    AppValidator.prototype.testHasOnlyDigits = function (testString) {
        var re = new RegExp('^[0-9]+$', 'g');
        return re.test(testString);
    };

    // Checks if string contains any letter characters.
    // @param {string} [testString] string to be tested
    AppValidator.prototype.testHasLetters = function (testString) {
        var re = new RegExp('[a-zA-Z\\u00C0-\\u017F]', 'g');
        return re.test(testString);
    };

    // Checks if string contains any special characters.
    // @param {string} [testString] string to be tested
    AppValidator.prototype.testHasSpecials = function (testString) {
        var re = new RegExp('[^a-zA-Z\\d\\s:]', 'g');
        return re.test(testString);
    };

    // Checks if string is longer than given limit.
    // @param {string} [testString] string to be tested
    // @param {integer} {limit} that string needs to be longer than
    AppValidator.prototype.testLengthOver = function (testString, limit) {
        return testString.length > limit;
    };

    // Checks if string is shorter than given limit.
    // @param {string} [testString] string to be tested
    // @param {integer} {limit} that string needs to be shorter than
    AppValidator.prototype.testLengthUnder = function (testString, limit) {
        return testString.length < limit;
    };

    // Check if number is withing a range (with edges).
    // @param {integer} [testNumber] number to be tested
    // @param {integer} [min] bottom edge
    // @param {integer} [max] top edge
    AppValidator.prototype.testNumberRange = function (testNumber, min, max) {
        var isOverMin = testNumber >= min;
        var isUnderMax = testNumber <= max;
        return isOverMin && isUnderMax;
    };

    // export to app
	window.app = window.app || {};
	window.app.validator = new AppValidator();

})(window);
