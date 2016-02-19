describe('helpers: extend', function () {

    'use strict';

    it('should exist', function () {
        expect(extend).toBeDefined();
    });

    it('should add properties to object', function () {
        var baseObj = {};
        var testObj = { foo: 'bar' };
        extend(baseObj, testObj);
        expect(baseObj.foo).toEqual('bar');
    });

    it('should not be overwritten while extending', function () {
        var baseObj = {};
        var firstObj = { foo: 'bar' };
        var secondObj = { fum: 'baz' };
        extend(baseObj, firstObj);
        extend(baseObj, secondObj);
        expect(baseObj.fum).toEqual('baz');
        expect(baseObj.foo).toEqual('bar');
    });

});
