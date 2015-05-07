/*jshint node:true */

module.exports = function(grunt) {
  'use strict';

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: 'gruntfile.js',
      src: 'src/**/*.js',
      spec: {
        options: {
          jshintrc: 'test/spec/.jshintrc'
        },
        src: 'test/spec/**/*.js'
      }
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      gruntfile: {
        files: {
          src: [
            'gruntfile.js'
          ]
        }
      },
      spec: {
        files: {
          src: [
            'test/spec/**/*.js'
          ]
        }
      },
      scripts: {
        files: {
          src: [
            'src/scripts/**/*.js'
          ]
        }
      }
    },

    clean: {
      dist: 'dist'
    },

    concat: {
      options: {separator: '\n'},
      dist: {
        src: ['src/scripts/module.js', 'src/scripts/**/*.js'],
        dest: 'dist/<%= fileNs %>.js'
      }
    },

    uglify: {
      dist: {
        src: 'dist/<%= fileNs %>.js',
        dest: 'dist/<%= fileNs %>.min.js'
      }
    },

    <% if(hasStyles) { %>less: {
      dist: {
        files: {
          'dist/<%= fileNs %>.css': 'src/styles/**/*.less'
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          'dist/<%= fileNs %>.min.css': 'dist/<%= fileNs %>.css'
        }
      }
    },

    <% } %>jasmine: {
      spec: {
        src: ['src/scripts/*.js', 'src/scripts/**/*.js'],
        options: {
          specs: 'test/spec/**/*.js',
          vendor: [
            <% if(hasStyles) { %>'bower_components/jquery/dist/jquery.js',
            <% } %>'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js'
          ]
        }
      }
    },

    watch: {
      scripts: {
        files: 'src/scripts/**/*.js',
        tasks: ['test', 'build:scripts']
      },
      <% if(hasStyles) { %>styles: {
        files: 'src/styles/**/*.less',
        tasks: ['build:styles']
      },
      <% } %>tests: {
        files: 'test/spec/**/*.js',
        tasks: ['test']
      }
    },

    bump: {
      options: {
        commitMessage: 'chore: Bump for release (v%VERSION%)',
        files: ['package.json', 'bower.json'],
        commitFiles: ['package.json', 'bower.json'],
        push: false
      }
    }
  });

  // Load plugins
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', [
    'jshint',
    'jscs',
    'jasmine'
  ]);

  <% if(hasStyles) { %>grunt.registerTask('build:scripts', [
    'concat',
    'uglify'
  ]);

  grunt.registerTask('build:styles', [
    'less',
    'cssmin'
  ]);

  grunt.registerTask('build', [
    'build:scripts',
    'build:styles'
  ]);

  <% } else { %>grunt.registerTask('build', [
    'concat',
    'uglify'
  ]);

  <% } %>grunt.registerTask('default', [
    'clean',
    'test',
    'build'
  ]);

};
