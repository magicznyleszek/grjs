describe('notifier: view', function () {

    'use strict';

    it('should exist', function () {
        expect(app.notifier.view).toBeDefined();
    });

    describe('add method', function () {

        it('should exist', function () {
            expect(app.notifier.view.add).toBeDefined();
        });

        it('should create a child in container', function () {
            // mock container element
            app.notifier.view._containerEl = document.createElement('div');
            document.body.appendChild(app.notifier.view._containerEl);

            var element = document.createElement('div');
            app.notifier.view.add(element);

            var lengthAfter = app.notifier.view._containerEl.children.length;

            expect(lengthAfter).toEqual(1);
        });

    });

    describe('remove method', function () {

        it('should exist', function () {
            expect(app.notifier.view.remove).toBeDefined();
        });

        it('should remove a child in container', function () {
            var elementId = 'foo';
            // mock container element
            app.notifier.view._containerEl = document.createElement('div');
            document.body.appendChild(app.notifier.view._containerEl);

            var element = document.createElement('div');
            element.setAttribute('id', elementId);
            app.notifier.view.add(element);

            var lengthBefore = app.notifier.view._containerEl.children.length;
            app.notifier.view.remove(elementId);
            var lengthAfter = app.notifier.view._containerEl.children.length;

            expect(lengthBefore).toEqual(1);
            expect(lengthAfter).toEqual(0);
        });

    });

});
