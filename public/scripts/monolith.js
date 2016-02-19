/* 2016-02-19 */
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
(function (window) {

    'use strict';

    function Notifier(containerId) {
        this.model = new app.notifier.Notification();
        this.view = new app.notifier.view(containerId);
        this.controller = new app.notifier.controller(this.model, this.view);
    }

    window.addEventListener('load', function () {
        var grjsNotifier = new Notifier('notifierContainer');
    });

})(window);

/* --- */
(function (window) {

    'use strict';

    // constructor
    var AppActions = function () {
        return {
            testAction: 'GRJS_TEST_ACTION',
            addNotification: 'GRJS_ADD_NOTIFICATION'
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
            console.warn('Tried to publish unknown event: ' + name);
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
    var AppNotifierController = function (model, view) {
        // safety checks
        if (model === undefined) {
            throw new Error('Tried to create modelless controller.');
        }
        if (view === undefined) {
            throw new Error('Tried to create viewless controller.');
        }
        this.model = model;
        this.view = view;

        this._notificationLifespan = 2 * 1000; // 2s

        app.broadcaster.subscribe(
            app.actions.addNotification,
            this._onAddNotification.bind(this)
        );
    };

    // Handle addNotification event.
    // @param {object} [event]
    // @param {object} [data] of the event
    AppNotifierController.prototype._onAddNotification = function (event, data) {
        var message = data.message;
        var type = data.type;

        // safety checks
        if (message === undefined) {
            throw new Error('Tried to create messageless notification.');
        }

        this._createNotification(message, type);
    };

    // Creates a notification with a lifespan.
    // @param {string} [message] to be displayed
    // @param {string} [type] of the notification
    AppNotifierController.prototype._createNotification = function (message, type) {
        var notification = this.model.create(message, type);
        var id = notification.attributes.id.value;

        this.view.add(notification);

        setTimeout(
            this._destroyNotification.bind(this),
            this._notificationLifespan,
            id
        );
    };

    // Destroys a notification by id.
    // @param {string} [id] of notification to be destroyed
    AppNotifierController.prototype._destroyNotification = function (id) {
        this.view.remove(id);
    };

    // export to app
    window.app = window.app || {};
    window.app.notifier = window.app.notifier || {};
    window.app.notifier.controller = AppNotifierController;

})(window);

/* --- */
(function (window) {

    'use strict';

    // constructor
    // @param {string} [containerId] html id of element container
    var AppNotifierView = function ( containerId ) {
        this._containerEl = document.getElementById(containerId);
    };

    // Add child node to container.
    // @param {object} [element] node to be added
    AppNotifierView.prototype.add = function (element) {
        this._containerEl.appendChild(element);
    };

    // Remove child node from container by it's id.
    // @param {string} [id] of node to be removed
    AppNotifierView.prototype.remove = function (id) {
        var targetEl = document.getElementById(id);
        this._containerEl.removeChild(targetEl);
    };

    // export to app
    window.app = window.app || {};
    window.app.notifier = window.app.notifier || {};
    window.app.notifier.view = AppNotifierView;

})(window);
