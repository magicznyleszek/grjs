describe('pubsub: broadcaster', function () {

    'use strict';

    beforeEach(function () {
        window.mockBroadcaster = new app.broadcaster(new app.actions);
    });

    afterEach(function () {
        window.mockBroadcaster = null;
    });

    it('should exist', function () {
        expect(window.mockBroadcaster).toBeDefined();
    });

    describe('subscribe method', function () {

        it('should exist', function () {
            expect(window.mockBroadcaster.subscribe).toBeDefined();
        });

        it('should save event callbacks', function () {
            var callback = function () {};
            window.mockBroadcaster.subscribe('testAction', callback);
            expect(window.mockBroadcaster._subscribers['testAction'][0]).toEqual(callback);
        });

    });

    describe('publish method', function () {

        it('should exist', function () {
            expect(window.mockBroadcaster.publish).toBeDefined();
        });

        it('should pass data to subscriber\`s callback', function () {
            var finalData = {};
            var testData = { foo: 'bar' };
            var callback = function (event, data) { finalData = data; };
            window.mockBroadcaster.subscribe('fooBarAction', callback);
            window.mockBroadcaster.publish('fooBarAction', testData);
            expect(finalData.foo).toEqual(testData.foo);
        });

    });

});
