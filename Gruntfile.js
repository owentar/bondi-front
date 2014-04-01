'use strict';

var request = require('request');

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var reloadPort = 35729, files;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        develop: {
            server: {
                file: 'app.js'
            }
        },

        watch: {
            options: {
                nospawn: true,
                livereload: reloadPort
            },
            server: {
                files: [
                    'app.js',
                    'routes/**/*.js'
                ],
                tasks: ['develop', 'delayed-livereload']
            },
            js: {
                files: ['public/js/**/*.js'],
                options: {
                    livereload: reloadPort
                }
            },
            coffee: {
                files: ['app/**/*.coffee'],
                tasks: ['coffee']
            },
            css: {
                files: ['public/css/**/*.css'],
                options: {
                    livereload: reloadPort
                }
            },
            html: {
                files: ['views/**/*.html'],
                options: {
                    livereload: reloadPort
                }
            }
        },

        // Automatically inject Bower components into the HTML file
        bowerInstall: {
            components: {
                src: ['views/layout.html'],
                ignorePath: 'public/',
                fileTypes: {
                    html: {
                        replace: {
                            js: '<script src="/{{filePath}}"></script>'
                        }
                    }
                }
            }
        },

        coffee: {
            compile: {
                files: { 'public/js/bondi/app.js': 'app/**/*.coffee' },
                join: true
            }
        }
    });

    grunt.config.requires('watch.server.files');
    files = grunt.config('watch.server.files');
    files = grunt.file.expand(files);

    grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
        var done = this.async();
        setTimeout(function () {
            request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
                var reloaded = !err && res.statusCode === 200;
                if (reloaded) {
                    grunt.log.ok('Delayed live reload successful.');
                } else {
                    grunt.log.error('Unable to make a delayed live reload.');
                }
                done(reloaded);
            });
        }, 500);
    });

    grunt.registerTask('default', ['bowerInstall', 'coffee', 'develop', 'watch']);
};
