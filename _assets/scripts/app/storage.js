(function (window) {

    'use strict';

    // constructor
    var AppStorage = function (namespace, broadcaster) {
        // safety checks
        if (broadcaster === undefined) {
            throw new Error('Tried to create broadcasterless storage.');
        }
        if (namespace === undefined) {
            namespace = 'appStorage';
        }

        this._namespace = namespace;
        this._broadcaster = broadcaster;

        this._prepareStorage(this._namespace);

        this._broadcaster.subscribe(
            this._broadcaster.actions.addDataToStorage,
            this._onAddDataToStorage.bind(this)
        );
    };

    // Handle addDataToStorage event.
    // @param {object} [event]
    // @param {object} [data] of the event
    AppStorage.prototype._onAddDataToStorage = function (event, eventData) {
        var data = eventData.data;

        // safety checks
        if (data === undefined) {
            throw new Error('Tried to save undefined data to storage.');
        }

        this.addData(data);
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
