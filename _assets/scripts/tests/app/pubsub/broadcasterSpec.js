describe('pubsub: broadcaster', function () {

    'use strict';

    it('should exist', function () {
        expect(app.broadcaster).toBeDefined();
    });

    it('should have subscribe method', function () {
        expect(app.broadcaster.subscribe).toBeDefined();
    });

    it('should save event callbacks with subscribe', function () {
        var callback = function () { return true; };
        app.broadcaster.subscribe('testAction', callback);
        expect(app.broadcaster.subscribers['testAction'][0]).toEqual(callback);
    });

    it('should have publish method', function () {
        expect(app.broadcaster.publish).toBeDefined();
    });

    it('should pass data to subscriber callback with publish', function () {
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
