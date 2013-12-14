module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('../package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
        // 'js/nux/assets/zoe.min.js',
        'js/nux/requires/utils.js',
        'js/nux/requires/NuxImplement.js', 
        'js/nux/requires/NuxComponentHeader.js',
        'js/nux/requires/_F.js',
        'js/nux/requires/init.js',
        'js/nux/requires/assets.js',
        'js/nux/requires/bootloader.js',
        'js/nux/requires/core.js',
        'js/nux/requires/config.js',
        'js/nux/requires/errors.js',
        'js/nux/requires/events.js',
        'js/nux/requires/fetch.js',
        'js/nux/requires/listener.js',
        'js/nux/requires/settings.js',
        'js/nux/requires/signature.js',
        'js/nux/requires/use.js',
        'js/nux/requires/shortcuts.js',
        
        'js/nux/nux.js',

        'js/nux/requires/listener-handler-map',
        'js/nux/requires/use-ch'
        ],
        dest: '../dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        
      },
      dist: {
        files: {
          '../dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'js/nux/nux.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};