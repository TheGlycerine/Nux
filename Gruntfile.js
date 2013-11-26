module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
        // 'src/js/nux/assets/zoe.min.js',
        'src/js/nux/requires/utils.js',

        'src/js/nux/requires/NuxImplement.js', 
        'src/js/nux/requires/NuxComponentHeader.js',
        'src/js/nux/requires/_F.js',
        'src/js/nux/requires/init.js',
        'src/js/nux/requires/assets.js',
        'src/js/nux/requires/bootloader.js',
        'src/js/nux/requires/core.js',
        'src/js/nux/requires/config.js',
        'src/js/nux/requires/errors.js',
        'src/js/nux/requires/events.js',
        'src/js/nux/requires/fetch.js',
        'src/js/nux/requires/listener.js',
        'src/js/nux/requires/settings.js',
        'src/js/nux/requires/signature.js',
        'src/js/nux/requires/use.js',
        'src/js/nux/requires/shortcuts.js',
        
        'src/js/nux/nux.js',

        'src/js/nux/requires/listener-handler-map',
        'src/js/nux/requires/use-ch'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/js/nux/nux.js'],
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