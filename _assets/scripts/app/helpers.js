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
