/* 2016-02-18 */
// global helpers

'use strict';

// Adds object properties to another object.
// @param {object} obj
var extend = function (baseObj, addedObj) {
    for (var key in addedObj) {
        if (addedObj.hasOwnProperty(key)) {
            baseObj[key] = addedObj[key];
        }
    }
};

/* --- */
// global namespace
var app = app || {};

/* --- */
(function (window) {

    'use strict';

    // constructor
    var AppActions = function () {
        return {
            testAction: 'GRJS_TEST_ACTION'
        };
    };

    // export to app
	window.app = window.app || {};
	window.app.actions = new AppActions();

})(window);

/* --- */
(function (window) {

    'use strict';

    // constructor
    var AppBroadcaster = function () {
        this.subscribers = {};
    };

    // Subscribes to an event with a callback.
    // @param {string} [name] event name
    // @param {function} [callback] to be called whenever event is published
    AppBroadcaster.prototype.subscribe = function (name, callback) {
        if (this.subscribers[name] === undefined) {
            this.subscribers[name] = [];
        }
        this.subscribers[name].push(callback);
    };

    // Publish to an event with a callback.
    // @param {string} name
    AppBroadcaster.prototype.publish = function (name, data) {
        var subsArray = this.subscribers[name];
        if (subsArray === undefined) {
            console.warn('Tried to publish unknown event:' + name);
        } else {
            for (var i = 0, j = subsArray.length; i < j; i += 1) {
                subsArray[i]({ name: name }, data);
            }
        }
    };

    // export to app
	window.app = window.app || {};
	window.app.broadcaster = new AppBroadcaster();

})(window);

/* --- */
(function (window) {

    'use strict';

    // constructor
    var AppNotification = function () {
        this._amAttr = 'gui-o-notification';
        this._defaultType = 'info';
    };

    // Creates a new notification instance - returns a node.
    // @param {string} [message] to be shown in notification
    // @param {string} [type] for distinguishin between errors and infos
    AppNotification.prototype.create = function (message, type) {
        // safety checks
        if (message === undefined) {
            throw new Error('Tried to create messageless notification.');
        }
        switch (type) {
            case 'info': break;
            case 'error': break;
            default: type = this._defaultType;
        }

        var element = document.createElement('div');
        element.setAttribute(this._amAttr, type);
        element.setAttribute('id', this._generateId());
        element.innerText = message;

        return element;
    };

    // Generates a random id for notification.
    AppNotification.prototype._generateId = function () {
        var idLength = 32;
        var id = '';
        // always start with a letter -- base 36 makes for a nice shortcut
        id += (Math.floor((Math.random() * 25)) + 10).toString(36);
        // add a timestamp in milliseconds (base 36 again) as the base
        id += (new Date()).getTime().toString(36);
        // complete the id with random alphanumeric characters
        while (id.length < idLength) {
            id += (Math.floor((Math.random() * 35))).toString(36);
        }
        return id;
    };

    // export to app
    window.app = window.app || {};
    window.app.notifier = window.app.notifier || {};
    window.app.notifier.Notification = AppNotification;

})(window);

/* --- */
(function (window) {

    'use strict';

    // constructor
    var AppNotifierController = function () {};

    // export to app
    window.app = window.app || {};
    window.app.notifier = window.app.notifier || {};
    window.app.notifier.controller = new AppNotifierController;

})(window);

/* --- */
(function (window) {

    'use strict';

    // constructor
    var AppNotifierView = function () {};

    // export to app
    window.app = window.app || {};
    window.app.notifier = window.app.notifier || {};
    window.app.notifier.view = new AppNotifierView;

})(window);
