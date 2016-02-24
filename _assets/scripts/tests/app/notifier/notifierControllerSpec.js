describe('notifier: controller', function () {

    'use strict';

    beforeEach(function () {
        // mock container element and view
        var mockEl = document.createElement('div');
        mockEl.setAttribute('id', 'fooContainer');
        document.body.appendChild(mockEl);

        spyOn(app.notifier.controller.prototype, '_onAddNotification');
        var mockBroadcaster = new app.broadcaster(new app.actions());
        window.mockCtrl = new app.notifier.controller(
            new app.notifier.Notification(),
            new app.notifier.view('fooContainer'),
            mockBroadcaster
        );

        jasmine.clock().install();
    });

    afterEach(function () {
        var mockViewContainer = window.mockCtrl._view._containerEl;
        while (mockViewContainer.firstChild) {
            mockViewContainer.removeChild(mockViewContainer.firstChild);
        }

        jasmine.clock().uninstall();
    });

    it('should exist', function () {
        expect(app.notifier.controller).toBeDefined();
    });

    it('should react to addNotification event', function () {
        window.mockCtrl._broadcaster.publish(
            window.mockCtrl._broadcaster.actions.addNotification,
            { message: 'a' }
        );
        expect(window.mockCtrl._onAddNotification).toHaveBeenCalled();
    });


    describe('_createNotification method', function () {

        it('should exist', function () {
            expect(window.mockCtrl._createNotification).toBeDefined();
        });

        it('should add element to view\'s container', function () {
            window.mockCtrl._createNotification('foo', 'error');
            expect(window.mockCtrl._view._containerEl.children.length).toEqual(1);
        });

        it('should remove element after timeout', function () {
            var lifespan = window.mockCtrl._notificationLifespan;
            var lengthBefore = null;
            var lengthAfter = null;

            window.mockCtrl._createNotification('foo', 'error');
            lengthBefore = window.mockCtrl._view._containerEl.children.length;

            jasmine.clock().tick(lifespan + 1);

            lengthAfter = window.mockCtrl._view._containerEl.children.length;

            expect(lengthBefore).toEqual(1);
            expect(lengthAfter).toEqual(0);
        });

    });

});
