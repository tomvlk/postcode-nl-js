'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      options: {
        browserifyOptions: {
          debug: true
        }
      },
      dist: {
        options: {
          transform: [
            ["babelify", {
            }]
          ]
        },
        files: {
          "./lib/postcode-browser.js": ["./src/browser.js"]
        }
      }
    },
    watch: {
      scripts: {
        files: ['./src/*.js'],
        tasks: ['browserify', 'babel']
      }
    },

    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['*.js'],
          dest: 'lib/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['browserify', 'babel']);
}
