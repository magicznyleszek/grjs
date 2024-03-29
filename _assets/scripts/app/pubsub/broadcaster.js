(function (window) {

    'use strict';

    // constructor
    // @param {object} [actions] all possible broadcaster actions
    var AppBroadcaster = function (actions) {
        this.actions = actions;
        this._subscribers = {};
    };

    // Subscribes to an event with a callback.
    // @param {string} [name] event name
    // @param {function} [callback] to be called whenever event is published
    AppBroadcaster.prototype.subscribe = function (name, callback) {
        if (this._subscribers[name] === undefined) {
            this._subscribers[name] = [];
        }
        this._subscribers[name].push(callback);
    };

    // Publish to an event with a callback.
    // @param {string} name
    AppBroadcaster.prototype.publish = function (name, data) {
        var subsArray = this._subscribers[name];
        if (subsArray === undefined) {
            console.warn('Tried to publish unknown event: ' + name);
        } else {
            for (var i = 0, j = subsArray.length; i < j; i += 1) {
                subsArray[i]({ name: name }, data);
            }
        }
    };

    // export to app
	window.app = window.app || {};
	window.app.broadcaster = AppBroadcaster;

})(window);
