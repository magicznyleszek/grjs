module.exports = function(grunt) {

    // prepare stuff
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            public: {
                src: [
                    'public/scripts',
                    'public/styles'
                ]
            }
        },
        copy: {
            thirdparty: {
                expand: true,
                cwd: '_assets/scripts/thirdparty',
                src: '**/*.js',
                dest: 'public/scripts/thirdparty'
            }
        },
        concat: {
            scripts: {
                options: {
                    separator: ';',
                    process: true,
                    stripBanners: false,
                    separator: '\n/* --- */\n',
                    banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'public/scripts/app.js': [
                        '_assets/scripts/app/main.js'
                    ]
                }
            }
        },
        cssnext: {
            options: {
                sourcemap: false,
                import: true,
                compress: true
            },
            dist: {
                files: { 'public/styles/main.css': '_assets/styles/main.css' }
            }
        },
        watch: {
            styles: {
                files: ['_assets/styles/**/*.css'],
                tasks: ['cssnext']
            },
            scripts: {
                files: ['_assets/scripts/app/**/*.js'],
                tasks: ['concat:scripts']
            }
        },
        jasmine: {
            src: '_assets/scripts/app/**/*.js',
            options: {
                vendor: '_assets/scripts/thirdparty/**/*.js',
                specs: '_assets/scripts/tests/**/*Spec.js',
                helpers: '_assets/scripts/tests/**/*Helper.js'
            }
        },
        'jasmine-server' : {
            browser: false
        }
    });

    grunt.registerTask('build_assets', [
        'jasmine',
        'clean:public',
        'copy:thirdparty',
        'concat:scripts',
        'cssnext'
    ]);
    grunt.registerTask('default', [
        'build_assets',
        'watch'
    ]);
}
