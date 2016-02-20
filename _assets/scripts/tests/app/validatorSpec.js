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

    describe('testHasNoDigits method', function () {

        it('should exist', function () {
            expect(app.validator.testHasNoDigits).toBeDefined();
        });

        it('should succeed for string without digits', function () {
            var strings = [
                'pójdźże, kiń tę chmurność w głąb flaszy',
                'pterodactyl porn',
                'Ol',
                '~!@#$%^&*()_+'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(app.validator.testHasNoDigits(strings[i])).toBeTruthy();
            }
        });

        it('should fail for string with digits', function () {
            var strings = [
                'wziąłbym 1 pęczek lub 7 gwoździków',
                'pr0n',
                '1',
                '~!@345^&*90-+'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(app.validator.testHasNoDigits(strings[i])).toBeFalsy();
            }
        });

    });

    describe('testHasOnlyDigits method', function () {

        it('should exist', function () {
            expect(app.validator.testHasOnlyDigits).toBeDefined();
        });

        it('should fail for string with non-digit characters', function () {
            var strings = [
                'pójdźże, kiń tę chmurność w głąb flaszy',
                'pterodactyl porn',
                'Ol',
                '~!@#$%^&*()_+',
                '11231241 12312',
                '3,14'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(app.validator.testHasOnlyDigits(strings[i])).toBeFalsy();
            }
        });

        it('should succeed for string with digits only', function () {
            var strings = [
                '1337',
                '2345678831265698657432',
                '1'
            ];
            for (var i = 0; i < strings.length; i += 1) {
                expect(app.validator.testHasOnlyDigits(strings[i])).toBeTruthy();
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

        it('should fail for equal length string', function () {
            expect(app.validator.testLengthOver('~!@345^&*9O-+', 13)).toBeFalsy();
            expect(app.validator.testLengthOver('8=D(|)', 6)).toBeFalsy();
            expect(app.validator.testLengthOver('pr0n', 4)).toBeFalsy();
            expect(app.validator.testLengthOver('', 0)).toBeFalsy();
        });

        it('should fail for shorter string', function () {
            expect(app.validator.testLengthOver('~!@345^&*9O-+', 14)).toBeFalsy();
            expect(app.validator.testLengthOver('8=D(|)', 99)).toBeFalsy();
            expect(app.validator.testLengthOver('pr0n', 100)).toBeFalsy();
            expect(app.validator.testLengthOver('', 897659876)).toBeFalsy();
        });

        it('should succeed for longer string', function () {
            expect(app.validator.testLengthOver('~!@345^&*9O-+', 12)).toBeTruthy();
            expect(app.validator.testLengthOver('8=D(|)', 1)).toBeTruthy();
            expect(app.validator.testLengthOver('pr0n', 2)).toBeTruthy();
            expect(app.validator.testLengthOver('', -1)).toBeTruthy();
        });

    });

    describe('testLengthUnder method', function () {

        it('should exist', function () {
            expect(app.validator.testLengthUnder).toBeDefined();
        });

        it('should fail for equal length string', function () {
            expect(app.validator.testLengthUnder('~!@345^&*9O-+', 13)).toBeFalsy();
            expect(app.validator.testLengthUnder('8=D(|)', 6)).toBeFalsy();
            expect(app.validator.testLengthUnder('pr0n', 4)).toBeFalsy();
            expect(app.validator.testLengthUnder('', 0)).toBeFalsy();
        });

        it('should fail for longer string', function () {
            expect(app.validator.testLengthUnder('~!@345^&*9O-+', 12)).toBeFalsy();
            expect(app.validator.testLengthUnder('8=D(|)', 1)).toBeFalsy();
            expect(app.validator.testLengthUnder('pr0n', 2)).toBeFalsy();
            expect(app.validator.testLengthUnder('', -1)).toBeFalsy();
        });

        it('should succeed for shorter string', function () {
            expect(app.validator.testLengthUnder('~!@345^&*9O-+', 14)).toBeTruthy();
            expect(app.validator.testLengthUnder('8=D(|)', 99)).toBeTruthy();
            expect(app.validator.testLengthUnder('pr0n', 100)).toBeTruthy();
            expect(app.validator.testLengthUnder('', 897659876)).toBeTruthy();
        });

    });

    describe('testNumberRange method', function () {

        it('should exist', function () {
            expect(app.validator.testNumberRange).toBeDefined();
        });

        it('should succeed for number within range', function () {
            expect(app.validator.testNumberRange(0,-3,3)).toBeTruthy();
            expect(app.validator.testNumberRange(133,89,34567)).toBeTruthy();
            expect(app.validator.testNumberRange(2,1,3)).toBeTruthy();
            expect(app.validator.testNumberRange(11,10,12)).toBeTruthy();
        });

        it('should succeed for number on the edge', function () {
            expect(app.validator.testNumberRange(-3,-3,3)).toBeTruthy();
            expect(app.validator.testNumberRange(89,89,34567)).toBeTruthy();
            expect(app.validator.testNumberRange(3,1,3)).toBeTruthy();
            expect(app.validator.testNumberRange(12,10,12)).toBeTruthy();
        });

        it('should fail for number under range', function () {
            expect(app.validator.testNumberRange(-6,-3,3)).toBeFalsy();
            expect(app.validator.testNumberRange(88,89,34567)).toBeFalsy();
            expect(app.validator.testNumberRange(0,1,3)).toBeFalsy();
            expect(app.validator.testNumberRange(9,10,12)).toBeFalsy();
        });

        it('should fail for number over range', function () {
            expect(app.validator.testNumberRange(4,-3,3)).toBeFalsy();
            expect(app.validator.testNumberRange(34568,89,34567)).toBeFalsy();
            expect(app.validator.testNumberRange(4,1,3)).toBeFalsy();
            expect(app.validator.testNumberRange(13,10,12)).toBeFalsy();
        });

    });

});
