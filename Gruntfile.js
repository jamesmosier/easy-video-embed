module.exports = function(grunt) {
    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    //Load in the build configuration file.
    var userConfig = require('./build.config.js');

    //Give the Grunt plugins their instructions!
    var taskConfig = {

        //combine files like this: 'dist/js/output.js': ['js/input.js', 'js/input2.js']
        uglify: {
            scriptz: {
                files: {
                    '<%= dist_dir %>/easyVideoEmbed.min.js': '<%= src_dir %>/js/easyVideoEmbed.js'
                }
            }
        },

        //copy files from development dir to the build dir
        copy: {
            main: {
                files: [{
                    src: ['<%= src_dir %>/js/easyVideoEmbed.js'],
                    dest: '<%= dist_dir %>/'
                }, {
                    expand: true,
                    flatten: true,
                    src: ['<%= src_dir %>/js/easyVideoEmbed.js'],
                    dest: '<%= docs_dir %>/js/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: ['<%= docs_dir %>/bower_packages/jQuery/dist/jquery.min.js'],
                    dest: '<%= docs_dir %>/lib/',
                    filter: 'isFile'
                }]
            },
        },

        //lint JS files & display output in terminal
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= src_dir %>/js/*.js'
                ]
            }
        },

        //Empties the build folder to start fresh. Use the command: grunt clean
        clean: [
            '<%= dist_dir %>',
            '<%= docs_dir %>/_site'
        ],


        //, '<%= docs_dir %>/sass/*.scss'
        // watch for changes in any of the files below, which will trigger a rebuild and reload of page
        watch: {
            all: {
                files: ['<%= src_dir %>/js/*.js'],
                tasks: ['copy'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['<%= src_dir %>/js/*.js'],
                tasks: ['jshint:all'],
                options: {
                    livereload: true
                }
            },
            sass: {
                files: '<%= docs_dir %>/_sass/*.scss',
                tasks: ['sass', 'cssmin'],
                options: {
                    livereload: true
                }
            },
            jekyll: {
                files: ['<%= docs_dir %>/_layouts/*.html', '<%= docs_dir %>/_includes/*.html', '<%= docs_dir %>/js/*.js', '<%= docs_dir %>/_posts/*', '<%= docs_dir %>/css/docs.css', '<%= docs_dir %>/index.html'],
                tasks: ['jekyll'],
                options: {
                    livereload: true
                }
            },
        },

        //Docs tasks

        jekyll: {
          options: {
            src: '<%= docs_dir %>'
          },
            dist: {
              options: {
                dest: './docs/_site'
              }
            }
        },

        sass: {
            dist: {
                files: {
                    '<%= docs_dir %>/css/docs.css': 'docs/_sass/main.scss'
                }
            }
        },

        // http://192.168.1.143:3001/
        browserSync: {
            bsFiles: {
                src: ['<%= docs_dir %>/_site/css/*.css']
            },
            options: {
                // proxy: 'localhost',
                // port: 3333,
                watchTask: true,
                ghostMode: {
                    clicks: true,
                    scroll: true,
                    links: true,
                    forms: true
                },
                server: {
                    baseDir: '<%= docs_dir %>/_site'
                },
                watchTask: true
            },

        },
        //run: grunt gh-pages
        //grunt gh-pages --gh-pages-tag 'v3.2.1'
        'gh-pages': {
            options: {
              base: '<%= docs_dir %>/_site',
              message: 'pushing to ghPages from master'
            },
            src: ['index.html', 'images/*', 'js/*', 'bower_packages/**/**/*', 'css/*', 'lib/*']
          }

    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));


    grunt.registerTask('docsBuild', ['sass', 'uglify', 'copy', 'jekyll']);
    grunt.registerTask('docs', ['docsBuild', 'browserSync', 'watch']);

    grunt.registerTask('build', ['uglify', 'copy']);
    grunt.registerTask('default', ['build', 'connect', 'watch']);





};