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

        it('should create an object with name', function () {
            var instance = window.mockInput.create('foo');
            expect(instance.name).toBeDefined();
        });

        it('should create an object with value', function () {
            var instance = window.mockInput.create('foo');
            expect(instance.value).toBeDefined();
        });

        it('should create an object with validate callback', function () {
            var instance = window.mockInput.create('foo');
            expect(instance.validate).toBeDefined();
            expect(typeof instance.validate).toEqual('function');
        });

        it('should create an object with isLiveValidated', function () {
            var instance = window.mockInput.create('foo');
            expect(instance.isLiveValidated).toBeDefined();
        });

        it('should create an object with isEmpty', function () {
            var instance = window.mockInput.create('foo');
            expect(instance.isEmpty).toBeDefined();
        });

        it('should create an object with isFocused', function () {
            var instance = window.mockInput.create('foo');
            expect(instance.isFocused).toBeDefined();
        });

        it('should create an object with isValid', function () {
            var instance = window.mockInput.create('foo');
            expect(instance.isValid).toBeDefined();
        });

    });

    describe('instance validate', function () {

        it('should fail for wrong data', function () {
            var instance = window.mockInput.create('foo', 'email');
            instance.value = 'foo.bar';
            expect(instance.validate()).toBeFalsy();
        });

        it('should succeed for good data', function () {
            var instance = window.mockInput.create('foo', 'email');
            instance.value = 'foo-bar@fum.baz';
            expect(instance.validate()).toBeTruthy();
        });

    });

});
