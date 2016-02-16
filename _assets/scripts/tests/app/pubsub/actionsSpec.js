describe('pubsub: actions', function () {

    it('should exist', function () {
        expect(app.actions).toBeDefined();
    });

    it('should have a test action', function () {
        expect(app.actions.testAction).toBeDefined();
    });

});
