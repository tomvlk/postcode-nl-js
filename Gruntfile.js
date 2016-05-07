'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
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
        files: ["./src/*.js"],
        tasks: ["browserify"]
      }
    },

    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
          src: ['src/node/**.js'],
          dest: 'lib'
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
