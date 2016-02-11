module.exports = function(grunt) {

    // prepare stuff
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            generativeAssets: {
                src: [
                    'public/scripts',
                    'public/styles'
                ]
            }
        },
        copy: {
            nodeModules: {
                expand: true,
                files: {
                    'public/scripts/thirdparty/lodash.js': 'node_modules/lodash/lodash.js'
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
        }
    });

    grunt.registerTask('build_assets', [
        'clean:generativeAssets',
        'copy:nodeModules',
        'concat:scripts',
        'cssnext'
    ]);
    grunt.registerTask('default', [
        'build_assets',
        'watch'
    ]);
}
