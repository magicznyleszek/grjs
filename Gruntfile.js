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
        svgstore: {
            default: {
                options: {
                    prefix: 'symbol-',
                    svg: {
                        style: 'width: 0; height: 0; overflow: hidden; position: fixed; visibility: hidden;'
                    },
                    formatting: {
                        indent_size: 4
                    }
                },
                files: {
                    '_includes/symbols.svg': ['_assets/symbols/*.svg']
                }

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
                    'public/scripts/monolith.js': [
                        '_assets/scripts/app/app.js',
                        '_assets/scripts/app/pubsub/actions.js',
                        '_assets/scripts/app/pubsub/broadcaster.js',
                        '_assets/scripts/app/storage.js',
                        '_assets/scripts/app/validator.js',
                        '_assets/scripts/app/notifier/notification.js',
                        '_assets/scripts/app/notifier/notifierController.js',
                        '_assets/scripts/app/notifier/notifierView.js'
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
                files: {
                    'public/styles/main.css': '_assets/styles/main.css'
                }
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
        'jasmine-server': {
            browser: false
        }
    });

    grunt.registerTask('build_assets', [
        'jasmine',
        'clean:public',
        'svgstore',
        'concat:scripts',
        'cssnext'
    ]);
    grunt.registerTask('default', [
        'build_assets',
        'watch'
    ]);
}
