describe('validator', function () {

    'use strict';

    it('should exist', function () {
        expect(app.validator).toBeDefined();
    });

    describe('testHasDigits method', function () {

        it('should exist', function () {
            expect(app.validator.testHasDigits).toBeDefined();
        });

        it('should fail for empty', function () {
            expect(app.validator.testHasDigits('')).toBeFalsy();
        });

        it('should fail for string without digits', function () {
            var strings = [
                'pójdźże, kiń tę chmurność w głąb flaszy',
                'pterodactyl porn',
                'Ol',
                '~!@#$%^&*()_+'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(app.validator.testHasDigits(strings[i])).toBeFalsy();
            }
        });

        it('should succeed for string with digits', function () {
            var strings = [
                'wziąłbym 1 pęczek lub 7 gwoździków',
                'pr0n',
                '1',
                '~!@345^&*90-+'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(app.validator.testHasDigits(strings[i])).toBeTruthy();
            }
        });

    });

    describe('testHasLetters method', function () {

        it('should exist', function () {
            expect(app.validator.testHasLetters).toBeDefined();
        });

        it('should fail for empty', function () {
            expect(app.validator.testHasLetters('')).toBeFalsy();
        });

        it('should fail for string without letters', function () {
            var strings = [
                '#666',
                '1337 747434 15 783 8055',
                '1',
                '~!@#$%^&*()_+'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(app.validator.testHasLetters(strings[i])).toBeFalsy();
            }
        });

        it('should succeed for string with letters', function () {
            var strings = [
                'wziąłbym 1 pęczek lub 7 gwoździków',
                'pr0n',
                'l',
                '~!@345^&*9O-+'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(app.validator.testHasLetters(strings[i])).toBeTruthy();
            }
        });

    });

    describe('testHasSpecials method', function () {

        it('should exist', function () {
            expect(app.validator.testHasSpecials).toBeDefined();
        });

        it('should fail for empty', function () {
            expect(app.validator.testHasSpecials('')).toBeFalsy();
        });

        it('should fail for string without specials', function () {
            var strings = [
                'pterodactyl pr0n',
                '1337 747434 15 783 8055',
                'a',
                'qwertyuiop'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(app.validator.testHasSpecials(strings[i])).toBeFalsy();
            }
        });

        it('should succeed for string with specials', function () {
            var strings = [
                'wziąłbym 1 pęczek lub 7+ gwoździków',
                '8=D(|)',
                '*',
                '~!@345^&*9O-+'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(app.validator.testHasSpecials(strings[i])).toBeTruthy();
            }
        });

    });

    describe('testLengthOver method', function () {

        it('should exist', function () {
            expect(app.validator.testLengthOver).toBeDefined();
        });

    });

    describe('testLengthUnder method', function () {

        it('should exist', function () {
            expect(app.validator.testLengthUnder).toBeDefined();
        });

    });

    describe('testNumberRange method', function () {

        it('should exist', function () {
            expect(app.validator.testNumberRange).toBeDefined();
        });

        it('should fail for empty', function () {
            expect(app.validator.testNumberRange('')).toBeFalsy();
        });

    });

    describe('testDigitsCount method', function () {

        it('should exist', function () {
            expect(app.validator.testDigitsCount).toBeDefined();
        });

    });

});
