describe('form: input', function () {

    'use strict';

    beforeEach(function () {
        window.mockValidator = new app.validator();
        window.mockInput = new app.form.Input(window.mockValidator);
    });

    it('should exist', function () {
        expect(app.form.Input).toBeDefined();
    });

    it('should have a list of validate types', function () {
        expect(window.mockInput._validateTypes).toBeDefined();
    });

    describe('model create method', function () {

        it('should exist', function () {
            expect(window.mockInput.create).toBeDefined();
        });

        it('should require a name', function () {});

        it('should not require a type', function () {});

        it('should not require a liveValidate flag', function () {});

        it('should create an object with validate callback', function () {
        });

    });

});
