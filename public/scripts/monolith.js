/* 2016-02-20 */
(function (window) {

    'use strict';

    function App(properties) {
        this.broadcaster = new app.broadcaster(new app.actions);
        this.validator = new app.validator();
        this.storage = new app.storage(properties.storageId);
        this.notifier = new app.notifier.controller(
            new app.notifier.Notification(),
            new app.notifier.view(properties.notifierId),
            this.broadcaster
        );
        this.form = new app.form.controller(
            new app.form.Input(),
            new app.form.view(formId),
            this.broadcaster
        );
    }

    window.addEventListener('load', function () {
        window.grjs = new App({
            notifierId: 'notifierContainer',
            formId: 'promoForm',
            storageId: 'grjs'
        });
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
	window.app.actions = AppActions;

})(window);

/* --- */
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

/* --- */
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

/* --- */
(function (window) {

    'use strict';

    // constructor
    var AppValidator = function () {};

    // Checks if string contains any digit characters.
    // @param {string} [testString] string to be tested
    AppValidator.prototype.testHasDigits = function (testString) {
        var re = new RegExp('\\d', 'g');
        return re.test(testString);
    };

    // Check if string contains no digit characters.
    // @param {string} [testString] string to be tested
    AppValidator.prototype.testHasNoDigits = function (testString) {
        var re = new RegExp('^([^0-9]*)$', 'g');
        return re.test(testString);
    };

    // Check if string has only digit characters.
    // @param {string} [testString] string to be tested
    AppValidator.prototype.testHasOnlyDigits = function (testString) {
        var re = new RegExp('^[0-9]+$', 'g');
        return re.test(testString);
    };

    // Checks if string contains any letter characters.
    // @param {string} [testString] string to be tested
    AppValidator.prototype.testHasLetters = function (testString) {
        var re = new RegExp('[a-zA-Z\\u00C0-\\u017F]', 'g');
        return re.test(testString);
    };

    // Checks if string contains any special characters.
    // @param {string} [testString] string to be tested
    AppValidator.prototype.testHasSpecials = function (testString) {
        var re = new RegExp('[^a-zA-Z\\d\\s:]', 'g');
        return re.test(testString);
    };

    // Checks if string is longer than given limit.
    // @param {string} [testString] string to be tested
    // @param {integer} {limit} that string needs to be longer than
    AppValidator.prototype.testLengthOver = function (testString, limit) {
        return testString.length > limit;
    };

    // Checks if string is shorter than given limit.
    // @param {string} [testString] string to be tested
    // @param {integer} {limit} that string needs to be shorter than
    AppValidator.prototype.testLengthUnder = function (testString, limit) {
        return testString.length < limit;
    };

    // Check if number is withing a range (with edges).
    // @param {integer} [testNumber] number to be tested
    // @param {integer} [min] bottom edge
    // @param {integer} [max] top edge
    AppValidator.prototype.testNumberRange = function (testNumber, min, max) {
        var isOverMin = testNumber >= min;
        var isUnderMax = testNumber <= max;
        return isOverMin && isUnderMax;
    };

    // export to app
	window.app = window.app || {};
	window.app.validator = AppValidator;

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
    // @param {string} [containerId] html id of element container
    var AppNotifierView = function (containerId) {
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

/* --- */
(function (window) {

    'use strict';

    // constructor
    var AppNotifierController = function (model, view, broadcaster) {
        // safety checks
        if (model === undefined) {
            throw new Error('Tried to create modelless controller.');
        }
        if (view === undefined) {
            throw new Error('Tried to create viewless controller.');
        }
        if (broadcaster === undefined) {
            throw new Error('Tried to create broadcasterless controller.');
        }
        this.model = model;
        this.view = view;
        this.broadcaster = broadcaster;

        this._notificationLifespan = 2 * 1000; // 2s

        this.broadcaster.subscribe(
            this.broadcaster.actions.addNotification,
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
    var AppInput = function () {};

    // export to app
    window.app = window.app || {};
    window.app.form = window.app.form || {};
    window.app.form.Input = AppInput;

})(window);

/* --- */
(function (window) {

    'use strict';

    // constructor
    var AppFormView = function () {};

    // export to app
    window.app = window.app || {};
    window.app.form = window.app.form || {};
    window.app.form.view = AppFormView;

})(window);

/* --- */
(function (window) {

    'use strict';

    // constructor
    var AppFormController = function () {
        this._validatorTypes = {
            person: function () {},
            text10: function () {},
            text20: function () {},
            email: function () {},
            password: function () {},
            vid: function () {},
            counter20: function () {}
        };
    };

    // export to app
    window.app = window.app || {};
    window.app.form = window.app.form || {};
    window.app.form.controller = AppFormController;

})(window);
