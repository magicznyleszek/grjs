(function (window) {

    'use strict';

    // constructor
    var AppActions = function () {
        return {
            testAction: 'GRJS_TEST_ACTION',
            addNotification: 'GRJS_ADD_NOTIFICATION',
            formInputValueChanged: 'GRJS_FORM_INPUT_VALUE_CHANGED',
            formInputFocusChanged: 'GRJS_FORM_INPUT_FOCUS_CHANGED',
        };
    };

    // export to app
	window.app = window.app || {};
	window.app.actions = AppActions;

})(window);
