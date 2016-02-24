describe('pubsub: actions', function () {

    'use strict';

    beforeEach(function () {
        window.mockActions = new app.actions();
    });

    it('should exist', function () {
        expect(window.mockActions).toBeDefined();
    });

    it('should have test action', function () {
        expect(window.mockActions.testAction).toBeDefined();
    });

    it('should have addNotification action', function () {
        expect(window.mockActions.addNotification).toBeDefined();
    });

    it('should have formInputValueChanged action', function () {
        expect(window.mockActions.formInputValueChanged).toBeDefined();
    });

    it('should have formInputFocusChanged action', function () {
        expect(window.mockActions.formInputFocusChanged).toBeDefined();
    });

    it('should have formSubmitted action', function () {
        expect(window.mockActions.formSubmitted).toBeDefined();
    });

    it('should have addDataToStorage action', function () {
        expect(window.mockActions.addDataToStorage).toBeDefined();
    });

});
