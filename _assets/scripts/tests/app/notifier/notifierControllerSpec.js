describe('notifier: controller', function () {

    'use strict';

    it('should exist', function () {
        expect(app.notifier.controller).toBeDefined();
    });

    beforeEach(function () {
        // mock container element and view
        var mockEl = document.createElement('div');
        mockEl.setAttribute('id', 'fooContainer');
        document.body.appendChild(mockEl);

        spyOn(app.notifier.controller.prototype, '_onAddNotification');
        window.mockCtrl = new app.notifier.controller(
            new app.notifier.Notification(),
            new app.notifier.view('fooContainer')
        );

        jasmine.clock().install();
    });

    afterEach(function () {
        var mockViewContainer = window.mockCtrl.view._containerEl;
        while (mockViewContainer.firstChild) {
            mockViewContainer.removeChild(mockViewContainer.firstChild);
        }

        jasmine.clock().uninstall();
    });

    it('should react to addNotification event', function () {
        app.broadcaster.publish(app.actions.addNotification, { message: 'a' });
        expect(window.mockCtrl._onAddNotification).toHaveBeenCalled();
    });


    describe('_createNotification method', function () {

        it('should exist', function () {
            expect(window.mockCtrl._createNotification).toBeDefined();
        });

        it('should add element to view\'s container', function () {
            window.mockCtrl._createNotification('foo', 'error');
            expect(window.mockCtrl.view._containerEl.children.length).toEqual(1);
        });

        it('should remove element after timeout', function () {
            var lifespan = window.mockCtrl._notificationLifespan;
            var lengthBefore = null;
            var lengthAfter = null;

            window.mockCtrl._createNotification('foo', 'error');
            lengthBefore = window.mockCtrl.view._containerEl.children.length;

            jasmine.clock().tick(lifespan + 1);

            lengthAfter = window.mockCtrl.view._containerEl.children.length;

            expect(lengthBefore).toEqual(1);
            expect(lengthAfter).toEqual(0);
        });

    });

});
