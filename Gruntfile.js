module.exports = function(grunt) {

    // prepare stuff
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });
}
