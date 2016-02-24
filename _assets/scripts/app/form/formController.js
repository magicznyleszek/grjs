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
        this._inputs = {};

        this._broadcaster.subscribe(
            this._broadcaster.actions.formInputValueChanged,
            this._onFormInputValueChanged.bind(this)
        );
        this._broadcaster.subscribe(
            this._broadcaster.actions.formInputFocusChanged,
            this._onFormInputFocusChanged.bind(this)
        );
        this._broadcaster.subscribe(
            this._broadcaster.actions.formSubmitted,
            this._onFormSubmitted.bind(this)
        );

        this._prepareView();
    };

    // Handle formInputValueChanged event.
    // @param {object} [event]
    // @param {object} [data] of the event
    AppFormController.prototype._onFormInputValueChanged = function (event, data) {
        var value = data.value;
        var inputName = data.name;
        var inputInstance = this._inputs[inputName];

        inputInstance.value = value;
        inputInstance.isEmpty = value.length < 1;
        this._view.refreshInputState(inputInstance);

        if (inputInstance.isLiveValidated) {
            this._validateInput(inputInstance.name);
        }
    };

    // Handle formInputFocusChanged event.
    // @param {object} [event]
    // @param {object} [data] of the event
    AppFormController.prototype._onFormInputFocusChanged = function (event, data) {
        var isFocused = data.isFocused;
        var inputName = data.name;
        var inputInstance = this._inputs[inputName];

        inputInstance.isFocused = isFocused;
        this._view.refreshInputState(inputInstance);

        if (inputInstance.isFocused === false) {
            this._validateInput(inputInstance.name);
        }
    };

    // Handle formSubmitted event.
    // @param {object} [event]
    // @param {object} [data] of the event
    AppFormController.prototype._onFormSubmitted = function (event, data) {
        this._validateAllInputs();
    };

    // Make all inputs self-validate.
    AppFormController.prototype._validateAllInputs = function () {
        var errorsCount = 0;

        // validate all inputs
        for (var name in this._inputs) {
            if (this._inputs.hasOwnProperty(name)) {
                if (this._validateInput(name) === false) {
                    errorsCount += 1;
                }
            }
        }

        // save data to storage if no errors
        if (errorsCount === 0) {
            // save data to storage
            this._broadcaster.publish(
                this._broadcaster.actions.addDataToStorage,
                {
                    data: this._inputs
                }
            );
            // notify user about success
            this._broadcaster.publish(
                this._broadcaster.actions.addNotification,
                {
                    message: 'Form successfully submitted!',
                    type: 'info'
                }
            );
        }
    };

    // Make input self-validate and show error notification.
    // Returns boolean isValid; useful for other places.
    // @param {string} [name] input name
    AppFormController.prototype._validateInput = function (name) {
        var inputInstance = this._inputs[name];
        var isValid = inputInstance.validate();

        if (isValid === false) {
            this._notifyInputInvalid(inputInstance.name, inputInstance.value);
        }
        return isValid;
    };

    // Crate an invalid input notification.
    // @param {string} [name] input name
    // @param {string} [value] input value
    AppFormController.prototype._notifyInputInvalid = function (name, value) {
        var message = 'I\'m sorry, but "' + value + '" is not a proper value for ' + name;

        this._broadcaster.publish(
            this._broadcaster.actions.addNotification,
            {
                message: message,
                type: 'error'
            }
        );
    };

    // Prepare and bind all view things.
    AppFormController.prototype._prepareView = function () {
        var fields = this._formData.fields;
        var submitButtonId = this._formData.submitId;

        // bind all inputs
        for (var i = 0; i < fields.length; i += 1) {
            var instance = this._model.create(
                fields[i].name,
                fields[i].type,
                fields[i].liveValidate
            );
            this._inputs[instance.name] = instance;
            this._view.bindInput(instance);
        }

        // bind submitting
        this._view.bindSubmit(submitButtonId);
    };

    // export to app
    window.app = window.app || {};
    window.app.form = window.app.form || {};
    window.app.form.controller = AppFormController;

})(window);
