describe('pubsub: actions', function () {

    'use strict';

    it('should exist', function () {
        expect(app.actions).toBeDefined();
    });

    it('should have a test action', function () {
        expect(app.actions.testAction).toBeDefined();
    });

    it('should have an addNotification action', function () {
        expect(app.actions.addNotification).toBeDefined();
    });

});
