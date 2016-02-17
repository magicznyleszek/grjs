describe('notifier: notification', function () {

    it('should exist', function () {
        expect(app.notifier.Notification).toBeDefined();
    });

    describe('create method', function () {

        it('should exist', function () {
            expect(app.notifier.Notification.create).toBeDefined();
        });

        it('should create a node', function () {
        });

        it('should not allow for unknown types', function () {
        });

        it('should require a message', function () {
        });

    });

});
