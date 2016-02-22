describe('validator', function () {

    'use strict';

    beforeEach(function () {
        window.mockValidator = new app.validator();
    });

    it('should exist', function () {
        expect(window.mockValidator).toBeDefined();
    });

    describe('testHasDigits method', function () {

        it('should exist', function () {
            expect(window.mockValidator.testHasDigits).toBeDefined();
        });

        it('should fail for empty', function () {
            expect(window.mockValidator.testHasDigits('')).toBeFalsy();
        });

        it('should fail for string without digits', function () {
            var testFunc = window.mockValidator.testHasDigits;
            var strings = [
                'pójdźże, kiń tę chmurność w głąb flaszy',
                'pterodactyl porn',
                'Ol',
                '~!@#$%^&*()_+'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(testFunc(strings[i])).toBeFalsy();
            }
        });

        it('should succeed for string with digits', function () {
            var testFunc = window.mockValidator.testHasDigits;
            var strings = [
                'wziąłbym 1 pęczek lub 7 gwoździków',
                'pr0n',
                '1',
                '~!@345^&*90-+'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(testFunc(strings[i])).toBeTruthy();
            }
        });

    });

    describe('testHasNoDigits method', function () {

        it('should exist', function () {
            expect(window.mockValidator.testHasNoDigits).toBeDefined();
        });

        it('should succeed for string without digits', function () {
            var testFunc = window.mockValidator.testHasNoDigits;
            var strings = [
                'pójdźże, kiń tę chmurność w głąb flaszy',
                'pterodactyl porn',
                'Ol',
                '~!@#$%^&*()_+'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(testFunc(strings[i])).toBeTruthy();
            }
        });

        it('should fail for string with digits', function () {
            var testFunc = window.mockValidator.testHasNoDigits;
            var strings = [
                'wziąłbym 1 pęczek lub 7 gwoździków',
                'pr0n',
                '1',
                '~!@345^&*90-+'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(testFunc(strings[i])).toBeFalsy();
            }
        });

    });

    describe('testHasOnlyDigits method', function () {

        it('should exist', function () {
            expect(window.mockValidator.testHasOnlyDigits).toBeDefined();
        });

        it('should fail for string with non-digit characters', function () {
            var testFunc = window.mockValidator.testHasOnlyDigits;
            var strings = [
                'pójdźże, kiń tę chmurność w głąb flaszy',
                'pterodactyl porn',
                'Ol',
                '~!@#$%^&*()_+',
                '11231241 12312',
                '3,14'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(testFunc(strings[i])).toBeFalsy();
            }
        });

        it('should succeed for string with digits only', function () {
            var testFunc = window.mockValidator.testHasOnlyDigits;
            var strings = [
                '1337',
                '2345678831265698657432',
                '1'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(testFunc(strings[i])).toBeTruthy();
            }
        });

    });

    describe('testHasLetters method', function () {

        it('should exist', function () {
            expect(window.mockValidator.testHasLetters).toBeDefined();
        });

        it('should fail for empty', function () {
            expect(window.mockValidator.testHasLetters('')).toBeFalsy();
        });

        it('should fail for string without letters', function () {
            var testFunc = window.mockValidator.testHasLetters;
            var strings = [
                '#666',
                '1337 747434 15 783 8055',
                '1',
                '~!@#$%^&*()_+'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(testFunc(strings[i])).toBeFalsy();
            }
        });

        it('should succeed for string with letters', function () {
            var testFunc = window.mockValidator.testHasLetters;
            var strings = [
                'wziąłbym 1 pęczek lub 7 gwoździków',
                'pr0n',
                'l',
                '~!@345^&*9O-+'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(testFunc(strings[i])).toBeTruthy();
            }
        });

    });

    describe('testHasSpecials method', function () {

        it('should exist', function () {
            expect(window.mockValidator.testHasSpecials).toBeDefined();
        });

        it('should fail for empty', function () {
            expect(window.mockValidator.testHasSpecials('')).toBeFalsy();
        });

        it('should fail for string without specials', function () {
            var testFunc = window.mockValidator.testHasSpecials;
            var strings = [
                'pterodactyl pr0n',
                '1337 747434 15 783 8055',
                'a',
                'qwertyuiop'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(testFunc(strings[i])).toBeFalsy();
            }
        });

        it('should succeed for string with specials', function () {
            var testFunc = window.mockValidator.testHasSpecials;
            var strings = [
                'wziąłbym 1 pęczek lub 7+ gwoździków',
                '8=D(|)',
                '*',
                '~!@345^&*9O-+'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(testFunc(strings[i])).toBeTruthy();
            }
        });

    });

    describe('testLengthOver method', function () {

        it('should exist', function () {
            expect(window.mockValidator.testLengthOver).toBeDefined();
        });

        it('should fail for equal length string', function () {
            var testFunc = window.mockValidator.testLengthOver;
            expect(testFunc('~!@345^&*9O-+', 13)).toBeFalsy();
            expect(testFunc('8=D(|)', 6)).toBeFalsy();
            expect(testFunc('pr0n', 4)).toBeFalsy();
            expect(testFunc('', 0)).toBeFalsy();
        });

        it('should fail for shorter string', function () {
            var testFunc = window.mockValidator.testLengthOver;
            expect(testFunc('~!@345^&*9O-+', 14)).toBeFalsy();
            expect(testFunc('8=D(|)', 99)).toBeFalsy();
            expect(testFunc('pr0n', 100)).toBeFalsy();
            expect(testFunc('', 897659876)).toBeFalsy();
        });

        it('should succeed for longer string', function () {
            var testFunc = window.mockValidator.testLengthOver;
            expect(testFunc('~!@345^&*9O-+', 12)).toBeTruthy();
            expect(testFunc('8=D(|)', 1)).toBeTruthy();
            expect(testFunc('pr0n', 2)).toBeTruthy();
            expect(testFunc('', -1)).toBeTruthy();
        });

    });

    describe('testLengthUnder method', function () {

        it('should exist', function () {
            expect(window.mockValidator.testLengthUnder).toBeDefined();
        });

        it('should fail for equal length string', function () {
            var testFunc = window.mockValidator.testLengthUnder;
            expect(testFunc('~!@345^&*9O-+', 13)).toBeFalsy();
            expect(testFunc('8=D(|)', 6)).toBeFalsy();
            expect(testFunc('pr0n', 4)).toBeFalsy();
            expect(testFunc('', 0)).toBeFalsy();
        });

        it('should fail for longer string', function () {
            var testFunc = window.mockValidator.testLengthUnder;
            expect(testFunc('~!@345^&*9O-+', 12)).toBeFalsy();
            expect(testFunc('8=D(|)', 1)).toBeFalsy();
            expect(testFunc('pr0n', 2)).toBeFalsy();
            expect(testFunc('', -1)).toBeFalsy();
        });

        it('should succeed for shorter string', function () {
            var testFunc = window.mockValidator.testLengthUnder;
            expect(testFunc('~!@345^&*9O-+', 14)).toBeTruthy();
            expect(testFunc('8=D(|)', 99)).toBeTruthy();
            expect(testFunc('pr0n', 100)).toBeTruthy();
            expect(testFunc('', 897659876)).toBeTruthy();
        });

    });

    describe('testNumberRange method', function () {

        it('should exist', function () {
            expect(window.mockValidator.testNumberRange).toBeDefined();
        });

        it('should succeed for number within range', function () {
            var testFunc = window.mockValidator.testNumberRange;
            expect(testFunc(0,-3,3)).toBeTruthy();
            expect(testFunc(133,89,34567)).toBeTruthy();
            expect(testFunc(2,1,3)).toBeTruthy();
            expect(testFunc(11,10,12)).toBeTruthy();
        });

        it('should succeed for number on the edge', function () {
            var testFunc = window.mockValidator.testNumberRange;
            expect(testFunc(-3,-3,3)).toBeTruthy();
            expect(testFunc(89,89,34567)).toBeTruthy();
            expect(testFunc(3,1,3)).toBeTruthy();
            expect(testFunc(12,10,12)).toBeTruthy();
        });

        it('should fail for number under range', function () {
            var testFunc = window.mockValidator.testNumberRange;
            expect(testFunc(-6,-3,3)).toBeFalsy();
            expect(testFunc(88,89,34567)).toBeFalsy();
            expect(testFunc(0,1,3)).toBeFalsy();
            expect(testFunc(9,10,12)).toBeFalsy();
        });

        it('should fail for number over range', function () {
            var testFunc = window.mockValidator.testNumberRange;
            expect(testFunc(4,-3,3)).toBeFalsy();
            expect(testFunc(34568,89,34567)).toBeFalsy();
            expect(testFunc(4,1,3)).toBeFalsy();
            expect(testFunc(13,10,12)).toBeFalsy();
        });

    });

    describe('testEmail method', function () {

        it('should exist', function () {
            expect(window.mockValidator.testEmail).toBeDefined();
        });

        it('should succeed for valid email', function () {
            var testFunc = window.mockValidator.testEmail;
            var validEmails = [
                'foo@bar.fum',
                'foo.bar@fum.baz',
                'foo@bar.fum.baz',
                '123@foo',
                'foo+bar@fum',
                'foo-bar@fum.baz',
                'foo.bar-fum@baz-qux.zot',
                '#!$%&\'*+-/=?^_`{}|~@foo.bar',
                'foo@bar1'
            ];
            for (var i = 0; i < validEmails.length; i += 1) {
                expect(testFunc(validEmails[i])).toBeTruthy();
            }
        });

        it('should fail for invalid email', function () {
            var testFunc = window.mockValidator.testEmail;
            var invalidEmails = [
                'foo',
                '@',
                'foo@',
                '@foo',
                '@foo.bar',
                '.foo@bar.fum',
                'foo.@bar.fum',
                'foo..bar.fum',
                'foo@.bar.fum',
                'foo_bar-fum.baz',
                'foo@bar..fum',
                'foo@bar@fum.baz',
                'foo@bar.fum ',
                ' foo@bar.fum'
            ];
            for (var i = 0; i < invalidEmails.length; i += 1) {
                expect(testFunc(invalidEmails[i])).toBeFalsy();
            }
        });

    });

});
