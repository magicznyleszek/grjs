(function (window) {

    'use strict';

    // constructor
    var AppStorage = function (namespace) {
        this._namespace = namespace;
        this._prepareStorage(this._namespace);
    };

    // Creates a namespaced localStorage item.
    // @param {string} [namespace] localStorage item name
    AppStorage.prototype._prepareStorage = function (namespace) {
        window.localStorage.setItem(namespace, this._toJson([]));
    };

    // Saves new data to the storage.
    // @param {string} [testString] string to be tested
    AppStorage.prototype.addData = function (data) {
        var dataArray = this.getAllData();
        dataArray.push(data);
        window.localStorage.setItem(this._namespace, this._toJson(dataArray));
    };

    // Returns all saved data.
    AppStorage.prototype.getAllData = function () {
        var storageJson = window.localStorage.getItem(this._namespace);
        return this._fromJson(storageJson);
    };

    // Converts data to JSON string.
    // @param {object} [data] object to be jsonified
    AppStorage.prototype._toJson = function (data) {
        return JSON.stringify(data);
    };

    // Reads data from JSON string.
    // @param {object} [json] object to be jsonified
    AppStorage.prototype._fromJson = function (json) {
        return JSON.parse(json);
    };

    // export to app
    window.app = window.app || {};
    window.app.storage = AppStorage;

})(window);
