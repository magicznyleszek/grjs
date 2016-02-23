describe('pubsub: actions', function () {

    'use strict';

    beforeEach(function () {
        window.mockActions = new app.actions();
    });

    it('should exist', function () {
        expect(window.mockActions).toBeDefined();
    });

    it('should have a test action', function () {
        expect(window.mockActions.testAction).toBeDefined();
    });

    it('should have an addNotification action', function () {
        expect(window.mockActions.addNotification).toBeDefined();
    });

    it('should have an formInputValueChanged action', function () {
        expect(window.mockActions.formInputValueChanged).toBeDefined();
    });

    it('should have an formInputFocusChanged action', function () {
        expect(window.mockActions.formInputFocusChanged).toBeDefined();
    });

});
