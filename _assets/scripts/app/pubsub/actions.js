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
