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
    },
    closureCompiler:  {
      buildout: {

        // [OPTIONAL] set an output file
        dest: '../dist/google_comp.js'
      },
      options: {
        // [REQUIRED] Path to closure compiler
        compilerFile: '../lib/compiler.jar',

        // [OPTIONAL] set to true if you want to check if files were modified
        // before starting compilation (can save some time in large sourcebases)
        checkModified: true,

        // [OPTIONAL] Set Closure Compiler Directives here
        compilerOpts: {
          /**
           * Keys will be used as directives for the compiler
           * values can be strings or arrays.
           * If no value is required use null
           *
           * The directive 'externs' is treated as a special case
           * allowing a grunt file syntax (<config:...>, *)
           *
           * Following are some directive samples...
           */
           compilation_level: 'ADVANCED_OPTIMIZATIONS',
           externs: ['js/nux/requires/**/*.js', 'js/nux/nux.js'],
      
           warning_level: 'verbose',
           jscomp_off: ['checkTypes', 'fileoverviewTags'],
           summary_detail_level: 3,
           output_wrapper: '"(function(){%output%}).call(this);"'
        },
      },
    }
  });

  // grunt.loadNpmTasks('grunt-devtools');
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['jshint', 'concat', 'uglify']);

};