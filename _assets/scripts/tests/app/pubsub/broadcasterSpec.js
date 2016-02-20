describe('pubsub: broadcaster', function () {

    'use strict';

    it('should exist', function () {
        expect(app.broadcaster).toBeDefined();
    });

    describe('subscribe method', function () {

        it('should exist', function () {
            expect(app.broadcaster.subscribe).toBeDefined();
        });

        it('should save event callbacks', function () {
            var callback = function () { return true; };
            app.broadcaster.subscribe('testAction', callback);
            expect(app.broadcaster.subscribers['testAction'][0]).toEqual(callback);
        });

    });

    describe('publish method', function () {

        it('should exist', function () {
            expect(app.broadcaster.publish).toBeDefined();
        });

        it('should pass data to subscriber\`s callback', function () {
            var finalData = {};
            var testData = {
                foo: 'bar'
            };
            var callback = function (event, data) { finalData = data; };
            app.broadcaster.subscribe('fooBarAction', callback);
            app.broadcaster.publish('fooBarAction', testData);
            expect(finalData.foo).toEqual(testData.foo);
        });

    });

});
