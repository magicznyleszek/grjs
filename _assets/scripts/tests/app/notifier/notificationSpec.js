describe('notifier: notification', function () {

    'use strict';

    beforeEach(function () {
        window.notificationAm = 'gui-o-notification';
    });

    it('should exist', function () {
        expect(app.notifier.Notification).toBeDefined();
    });

    describe('model _generateId method', function () {

        it('should exist', function () {
            var Model = new app.notifier.Notification();
            expect(Model._generateId).toBeDefined();
        });

        it('should generate different id\'s', function () {
            var hasDuplicates = false;
            var Model = new app.notifier.Notification();
            var ids = [];
            for (var i = 0; i < 100; i += 1) {
                ids.push(Model._generateId());
            }
            while (ids.length > 1) {
                if (ids.indexOf(ids.pop()) != -1) {
                    hasDuplicates = true;
                }
            }
            expect(hasDuplicates).toBeFalsy();
        });

    });

    describe('model create method', function () {

        it('should exist', function () {
            var Model = new app.notifier.Notification();
            expect(Model.create).toBeDefined();
        });

        it('should create a node', function () {
            var Model = new app.notifier.Notification();
            var el = Model.create('foo');
            expect(el.nodeName).toBeDefined();
        });

        it('should add id to node', function () {
            var Model = new app.notifier.Notification();
            var el = Model.create('foo');
            expect(el.attributes.id).toBeDefined();
        });

        it('should set proper am', function () {
            var Model = new app.notifier.Notification();
            var el = Model.create('foo', 'error');
            expect(el.attributes[window.notificationAm]).toBeDefined();
        });

        it('should set proper attribute for error type', function () {
            var Model = new app.notifier.Notification();
            var el = Model.create('foo', 'error');
            expect(el.attributes[window.notificationAm].value).toEqual('error');
        });

        it('should default to "info" for unknown types', function () {
            var Model = new app.notifier.Notification();
            var el = Model.create('foo', 'bar');
            expect(el.attributes[window.notificationAm].value).toEqual('info');
        });

    });

});
