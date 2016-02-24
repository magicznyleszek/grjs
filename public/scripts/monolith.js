/* 2016-02-24 */
(function (window) {

    'use strict';


    // Crate a new app.
    // @param {object} [properties] a list of properties:
    // - @property {string} [notifierId] html id of notifications container
    // - @property {string} [storageId] a prefix for storage cache
    // - @property {object} [form] a form object with properties
    // - - @property {string} [id] html id of form container
    // - - @property {string} [submitId] html id of form submit button
    // - - @property {array} [fields] a list of form fields
    // - - - @element {object} a form element object with properties
    // - - - - @property {string} [name] form field input name
    // - - - - @property {string} [type] validation type
    // - - - - @property {bool} [liveValidate] turns live validation on
    function App(properties) {
        this.broadcaster = new app.broadcaster(new app.actions());
        this.storage = new app.storage(properties.storageId);
        this.notifier = new app.notifier.controller(
            new app.notifier.Notification(),
            new app.notifier.view(properties.notifierId),
            this.broadcaster
        );
        this.form = new app.form.controller(
            new app.form.Input(new app.validator()),
            new app.form.view(this.broadcaster, properties.form),
            this.broadcaster,
            properties.form
        );
    }

    window.addEventListener('load', function () {
        window.grjs = new App({
            notifierId: 'notifierContainer',
            storageId: 'grjs',
            form: {
                id: 'promoForm',
                submitId: 'promoForm-registerButton',
                fields: [
                    {
                        name: 'amount-1',
                        type: null,
                        liveValidate: false
                    },
                    {
                        name: 'amount-5',
                        type: null,
                        liveValidate: false
                    },
                    {
                        name: 'firstName',
                        type: 'person',
                        liveValidate: false
                    },
                    {
                        name: 'lastName',
                        type: 'person',
                        liveValidate: false
                    },
                    {
                        name: 'messageOne',
                        type: 'text10',
                        liveValidate: true
                    },
                    {
                        name: 'messageTwo',
                        type: 'text20',
                        liveValidate: true
                    },
                    {
                        name: 'email',
                        type: 'email',
                        liveValidate: false
                    },
                    {
                        name: 'pass',
                        type: 'password',
                        liveValidate: false
                    },
                    {
                        name: 'vid',
                        type: 'vid',
                        liveValidate: true
                    },
                    {
                        name: 'counter',
                        type: 'counter20',
                        liveValidate: false
                    }
                ]
            }
        });
    });

})(window);

/* --- */
(function (window) {

    'use strict';

    // constructor
    var AppActions = function () {
        return {
            testAction: 'TEST_ACTION',
            addNotification: 'ADD_NOTIFICATION',
            formInputValueChanged: 'FORM_INPUT_VALUE_CHANGED',
            formInputFocusChanged: 'FORM_INPUT_FOCUS_CHANGED',
            formSubmitted: 'FORM_SUBMITTED'
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

    // Check if email is valid.
    // @param {string} [email] email to be tested
    AppValidator.prototype.testEmail = function (email) {
        var lastIndex = email.length - 1;

        var hasOneAt = email.split('@').length - 1 === 1;
        var noStartAt = email[0] !== '@';
        var noEndAt = email[lastIndex] !== '@';
        var noStartDot = email[0] !== '.';
        var noStartSpace = email[0] !== ' ';
        var noEndSpace = email[lastIndex] !== ' ';
        var noDotBeforeAt = email.indexOf('.@') < 0;
        var noAtBeforeDot = email.indexOf('@.') < 0;
        var noDotBeforeDot = email.indexOf('..') < 0;

        if (hasOneAt === false) { return false; }
        else if (noStartAt === false) { return false; }
        else if (noEndAt === false) { return false; }
        else if (noStartDot === false) { return false; }
        else if (noStartSpace === false) { return false; }
        else if (noEndSpace === false) { return false; }
        else if (noDotBeforeAt === false) { return false; }
        else if (noAtBeforeDot === false) { return false; }
        else if (noDotBeforeDot === false) { return false; }
        else { return true; }
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
        var element = document.createElement('div');

        // safety checks
        if (message === undefined) {
            throw new Error('Tried to create messageless notification.');
        }
        switch (type) {
            case 'info': break;
            case 'error': break;
            default: type = this._defaultType;
        }

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
    // @param {object} [model] controller model
    // @param {object} [view] controller view
    // @param {object} [broadcaster] global event handler
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
        this._model = model;
        this._view = view;
        this._broadcaster = broadcaster;

        this._notificationLifespan = 2 * 1000; // 2s

        this._broadcaster.subscribe(
            this._broadcaster.actions.addNotification,
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
        var notification = this._model.create(message, type);
        var id = notification.attributes.id.value;

        this._view.add(notification);

        setTimeout(
            this._destroyNotification.bind(this),
            this._notificationLifespan,
            id
        );
    };

    // Destroys a notification by id.
    // @param {string} [id] of notification to be destroyed
    AppNotifierController.prototype._destroyNotification = function (id) {
        this._view.remove(id);
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
    var AppInput = function (validator) {
        var selfValidator = null;

        // safety checks
        if (validator === undefined) {
            throw new Error('Tried to create validatorless model.');
        }

        var selfValidator = validator;

        // a list of validator types (functions)
        this._validateTypes = {
            person: function () {
                var string = this.value;
                var isNonEmpty = selfValidator.testLengthOver(string, 0);
                var hasNoDigits = selfValidator.testHasNoDigits(string);
                return isNonEmpty && hasNoDigits;
            },
            text10: function () {
                var string = this.value;
                var isNonEmpty = selfValidator.testLengthOver(string, 0);
                var isUnder11 = selfValidator.testLengthUnder(string, 11);
                return isNonEmpty && isUnder11;
            },
            text20: function () {
                var string = this.value;
                var isNonEmpty = selfValidator.testLengthOver(string, 0);
                var isUnder21 = selfValidator.testLengthUnder(string, 21);
                return isNonEmpty && isUnder21;
            },
            email: function () {
                var string = this.value;
                return selfValidator.testEmail(string);
            },
            password: function () {
                var string = this.value;
                var isOver7 = selfValidator.testLengthUnder(string, 7);
                var hasDigits = selfValidator.testHasDigits(string);
                var hasLetters = selfValidator.testHasLetters(string);
                var hasSpecials = selfValidator.testHasSpecials(string);
                return isOver7 && hasDigits && hasLetters && hasSpecials;
            },
            vid: function () {
                var string = this.value;
                var isNonEmpty = selfValidator.testLengthOver(string, 0);
                var isUnder6 = selfValidator.testLengthUnder(string, 6);
                var hasOnlyDigits = selfValidator.testHasOnlyDigits(string);
                return isNonEmpty && isUnder6 && hasOnlyDigits;
            },
            counter20: function () {
                var number = parseInt(this.value);
                var isNonEmpty = selfValidator.testLengthOver(number, 0);
                var isInRange = selfValidator.testNumberRange(number, 1, 20);
                return isNonEmpty && isInRange;
            }
        };
    };

    // Creates an input instance.
    // @param {string} [name] name of the input
    // @param {string} [type] validate type to match function with
    // @param {bool} [liveValidated] for marking input as live validating
    AppInput.prototype.create = function (name, type, liveValidated) {
        var validateFunc = this._validateTypes[type];

        // safety checks
        if (name === undefined) {
            throw new Error('Tried to create nameless input.');
        }
        if (validateFunc === undefined) {
            validateFunc = function () { return true; }
        }

        return {
            name: name,
            value: null,
            validate: validateFunc,
            isLiveValidated: false,
            isEmpty: false,
            isFocused: false,
            isValid: false
        };
    };

    // export to app
    window.app = window.app || {};
    window.app.form = window.app.form || {};
    window.app.form.Input = AppInput;

})(window);

/* --- */
(function (window) {

    'use strict';

    // constructor
    // @param {object} [broadcaster] global event handler
    // @param {object} [form] form settings
    var AppFormView = function (broadcaster, form) {
        // safety checks
        if (form === undefined) {
            throw new Error('Tried to create formless controller.');
        }
        if (broadcaster === undefined) {
            throw new Error('Tried to create broadcasterless controller.');
        }

        this._formId = form.id;
        this._containerEl = document.getElementById(this._formId);
        this._broadcaster = broadcaster;
        this._stateAttrs = {
            empty: 'data-state-empty',
            focused: 'data-state-focused',
            valid: 'data-state-valid'
        };
    };

    // Returns dom input element.
    // @param {string} [name] name attribute of input element
    AppFormView.prototype._findInputEl = function (name) {
        return this._containerEl.querySelector('*[name="' + name + '"]');
    };

    // Binds  form submitting.
    // @param {string} [submitButtonId] id of submit button
    AppFormView.prototype.bindSubmit = function (submitButtonId) {
        var self = this;
        var buttonEl = this._containerEl.querySelector('*[id="' + submitButtonId + '"]');

        buttonEl.addEventListener('click', function () {
            self._broadcaster.publish(
                self._broadcaster.actions.formSubmitted,
                { id: self._formId }
            );
        });
    };

    // Binds to events on input.
    // @param {object} [input] input properties data
    AppFormView.prototype.bindInput = function (input) {
        var self = this;
        var inputName = input.name;
        var inputEl = this._findInputEl(inputName);

        inputEl.addEventListener('input', function () {
            self._broadcaster.publish(
                self._broadcaster.actions.formInputValueChanged,
                { name: inputName, value: inputEl.value }
            );
        });
        inputEl.addEventListener('focus', function () {
            self._broadcaster.publish(
                self._broadcaster.actions.formInputFocusChanged,
                { name: inputName, isFocused: true }
            );
        });
        inputEl.addEventListener('blur', function () {
            self._broadcaster.publish(
                self._broadcaster.actions.formInputFocusChanged,
                { name: inputName, isFocused: false }
            );
        });
    };

    // Refreshes input view state.
    // @param {object} [input] input properties data
    AppFormView.prototype.refreshInputState = function (input) {
        var inputEl = this._findInputEl(input.name);

        if (input.isEmpty) {
            inputEl.setAttribute(this._stateAttrs.empty, '');
        } else {
            if (inputEl.hasAttribute(this._stateAttrs.empty)) {
                inputEl.removeAttribute(this._stateAttrs.empty);
            }
        }

        if (input.isFocused) {
            inputEl.setAttribute(this._stateAttrs.focused, '');
        } else {
            if (inputEl.hasAttribute(this._stateAttrs.focused)) {
                inputEl.removeAttribute(this._stateAttrs.focused);
            }
        }

        if (input.isValid) {
            inputEl.setAttribute(this._stateAttrs.valid, '');
        } else {
            if (inputEl.hasAttribute(this._stateAttrs.valid)) {
                inputEl.removeAttribute(this._stateAttrs.valid);
            }
        }
    };

    // export to app
    window.app = window.app || {};
    window.app.form = window.app.form || {};
    window.app.form.view = AppFormView;

})(window);

/* --- */
(function (window) {

    'use strict';

    // constructor
    // @param {object} [model] controller model
    // @param {object} [view] controller view
    // @param {object} [broadcaster] global event handler
    // @param {object} [form] form settings
    var AppFormController = function (model, view, broadcaster, form) {
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
        if (form === undefined) {
            throw new Error('Tried to create formless controller.');
        }

        this._model = model;
        this._view = view;
        this._broadcaster = broadcaster;
        this._formData = form;
    };

    // export to app
    window.app = window.app || {};
    window.app.form = window.app.form || {};
    window.app.form.controller = AppFormController;

})(window);
