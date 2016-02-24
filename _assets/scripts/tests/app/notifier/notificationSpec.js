describe('notifier: notification', function () {

    'use strict';

    beforeEach(function () {
        window._amAttr = 'gui-o-notification';
        window.mockModel = new app.notifier.Notification();
    });

    afterEach(function () {
        window.mockModel = undefined;
    });

    it('should exist', function () {
        expect(app.notifier.Notification).toBeDefined();
    });

    describe('model create method', function () {

        it('should exist', function () {
            expect(window.mockModel.create).toBeDefined();
        });

        it('should create a node', function () {
            var element = window.mockModel.create('foo');
            expect(element.nodeName).toBeDefined();
        });

        it('should add id to node', function () {
            var element = window.mockModel.create('foo');
            expect(element.attributes.id).toBeDefined();
        });

        it('should set proper am', function () {
            var element = window.mockModel.create('foo', 'error');
            expect(element.attributes[window._amAttr]).toBeDefined();
        });

        it('should set proper attribute for error type', function () {
            var element = window.mockModel.create('foo', 'error');
            expect(element.attributes[window._amAttr].value).toEqual('error');
        });

        it('should default to "info" for unknown types', function () {
            var element = window.mockModel.create('foo', 'bar');
            expect(element.attributes[window._amAttr].value).toEqual('info');
        });

    });

    describe('model _generateId method', function () {

        it('should exist', function () {
            expect(window.mockModel._generateId).toBeDefined();
        });

        it('should generate different id\'s', function () {
            var hasDuplicates = false;
            var ids = [];
            for (var i = 0; i < 100; i += 1) {
                ids.push(window.mockModel._generateId());
            }
            while (ids.length > 1) {
                if (ids.indexOf(ids.pop()) != -1) {
                    hasDuplicates = true;
                }
            }
            expect(hasDuplicates).toBeFalsy();
        });

    });

});
