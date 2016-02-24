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
