describe('notifier: view', function () {

    'use strict';

    beforeEach(function () {
        // mock container element and view
        var mockEl = document.createElement('div');
        mockEl.setAttribute('id', 'fooContainer');
        document.body.appendChild(mockEl);

        window.mockView = new app.notifier.view('fooContainer');
    });

    afterEach(function () {
        var mockViewContainer = window.mockView._containerEl;
        while (mockViewContainer.firstChild) {
            mockViewContainer.removeChild(mockViewContainer.firstChild);
        }

        window.mockView = undefined;
    });

    it('should exist', function () {
        expect(app.notifier.view).toBeDefined();
    });

    describe('add method', function () {

        it('should exist', function () {
            expect(window.mockView.add).toBeDefined();
        });

        it('should create a child in container', function () {
            window.mockView.add(document.createElement('div'));
            expect(window.mockView._containerEl.children.length).toEqual(1);
        });

    });

    describe('remove method', function () {

        it('should exist', function () {
            expect(window.mockView.remove).toBeDefined();
        });

        it('should remove a child in container', function () {
            var elementId = 'foo';
            var lengthBefore = null;
            var lengthAfter = null;

            var element = document.createElement('div');
            element.setAttribute('id', elementId);
            window.mockView.add(element);

            lengthBefore = window.mockView._containerEl.children.length;
            window.mockView.remove(elementId);
            lengthAfter = window.mockView._containerEl.children.length;

            expect(lengthBefore).toEqual(1);
            expect(lengthAfter).toEqual(0);
        });

    });

});
