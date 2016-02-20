describe('storage', function () {

    'use strict';

    beforeEach(function () {
        window.mockStorage = new app.storage('foo');
    });

    afterEach(function () {
        window.localStorage.clear();
    });

    it('should exist', function () {
        expect(app.storage).toBeDefined();
    });

    describe('_prepareStorage method', function () {

        it('should exist', function () {
            expect(window.mockStorage._prepareStorage).toBeDefined();
        });

        it('should create a namespace in localStorage', function () {
            var namespace = 'foo';
            window.mockStorage._prepareStorage(namespace);
            var storageItem = window.localStorage.getItem(namespace);
            expect(storageItem).not.toEqual(null);
        });

    });

    describe('addData method', function () {

        it('should exist', function () {
            expect(window.mockStorage.addData).toBeDefined();
        });

        it('should add data to storage array', function () {
            var lengthAfter = null;
            var dataArray = window.mockStorage._fromJson(
                window.localStorage.getItem('foo')
            );
            var lengthBefore = dataArray.length;;

            window.mockStorage.addData({fum: 'baz'});

            dataArray = window.mockStorage._fromJson(
                window.localStorage.getItem('foo')
            );
            lengthAfter = dataArray.length;

            expect(lengthBefore).toEqual(0);
            expect(lengthAfter).toEqual(1);
        });

        it('should not overwrite data', function () {
            var dataArray = null;

            window.mockStorage.addData({fum: 'baz'});
            window.mockStorage.addData({qux: 'zot'});
            window.mockStorage.addData({asd: 'zxc'});

            dataArray = window.mockStorage._fromJson(
                window.localStorage.getItem('foo')
            );

            expect(dataArray.length).toEqual(3);
        });

    });

    describe('getAllData method', function () {

        it('should exist', function () {
            expect(window.mockStorage.getAllData).toBeDefined();
        });

        it('should return saved data', function () {
            var dataArray = null;

            window.mockStorage.addData({fum: 'baz'});

            dataArray = window.mockStorage.getAllData();

            expect(dataArray[0].fum).toEqual('baz');
        });

    });

    describe('_toJson method', function () {

        it('should exist', function () {
            expect(window.mockStorage._toJson).toBeDefined();
        });

        it('should create a JSON from object', function () {
            var testObj = {
                foo: 'bar',
                fum: {
                    baz: 'qux',
                    zot: 'asd'
                }
            };
            var expectedJson = '{"foo":"bar","fum":{"baz":"qux","zot":"asd"}}';
            var testJson = window.mockStorage._toJson(testObj);
            expect(testJson).toEqual(expectedJson);
        });

    });

    describe('_fromJson method', function () {

        it('should exist', function () {
            expect(window.mockStorage._fromJson).toBeDefined();
        });

        it('should create an object from JSON', function () {
            var testJson = '{"foo":{"bar":{"fum":"baz"}}}';
            var expectedObj = {
                foo: {
                    bar: {
                        fum: 'baz'
                    }
                }
            };
            var testObj = window.mockStorage._fromJson(testJson);
            expect(testObj.foo.bar.fum).toEqual('baz');
        });

    });

});
