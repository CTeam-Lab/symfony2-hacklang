module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // Load custom tasks
  grunt.loadTasks('Tasks');

  grunt.initConfig({
    dirs: {
      src: './App',
      build: {
        wd: './build',
        js: '<%= dirs.build.wd %>/js',
        css: '<%= dirs.build.wd %>/css',
        dist: '<%= dirs.build.wd %>/dist'
      }
    },

    // Custom tasks
    "update-ts-references": {
      default: {
        files: {
          '<%= dirs.src %>/generated.d.ts': ['<%= dirs.src %>/**/*.ts', '!<%= dirs.src %>/_all.d.ts']
        }
      }
    },

    // https://www.npmjs.com/package/grunt-contrib-clean
    clean: {
      build: '<%= dirs.build.wd %>/*'
    },

    // https://www.npmjs.com/package/grunt-run
    run: {
      tsd_install: {
        exec: 'tsd install'
      },
      tsd_update: {
        exec: 'tsd update -so'
      }
    },

    // https://www.npmjs.com/package/grunt-bower-task
    bower: {
      install: {
        options: {
          targetDir: '<%= dirs.build.dist %>',
          cleanup: true,
          layout: 'byComponent',
          bowerOptions: {
            production: grunt.option('env') || process.env.GRUNT_ENV || 'dev'
          }
        }
      }
    },

    // https://www.npmjs.com/package/grunt-ts
    ts: {
      default: {
        tsconfig: {
          tsconfig: './tsconfig.json',
          updateFiles: true
        }
      }
    },

    // https://www.npmjs.com/package/grunt-contrib-jade
    jade: {
      options: {
        pretty: true
      },
      default: {
        expand: true,
        cwd: '<%= dirs.src %>',
        dest: '<%= dirs.build.wd %>',
        src: ['**/*.jade', '!**/*.tpl.jade'],
        ext: '.html'
      }
    },

    // https://www.npmjs.com/package/grunt-html2js
    html2js: {
      options: {
        module: 'ctTemplates',
        singleModule: true,
        useStrict: true,
        jade: {
          doctype: 'html'
        },
        amd: true,
        base: '<%= dirs.src %>',
        htmlmin: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,

          removeComments: true,
          removeAttributeQuotes: false,
          removeEmptyAttributes: true,
          removeRedundantAttributes: false
        }
      },
      default: {
        src: '<%= dirs.src %>/**/*.tpl.jade',
        dest: '<%= dirs.build.js %>/Templates/Templates.js'
      }
    },

    // https://www.npmjs.com/package/grunt-contrib-sass
    sass: {
      options: {
        style: 'expanded'
      },
      default: {
        expand: true,
        cwd: '<%= dirs.src %>',
        src: ['**/*.sass'],
        dest: '<%= dirs.build.css %>',
        ext: '.css'
      }
    },

    // https://www.npmjs.com/package/grunt-contrib-watch
    watch: {
      options: {
        livereload: true
      },
      ts: {
        files: ['<%= dirs.src %>/**/*.ts', '!<%= dirs.src %>/tsd.d.ts', '!<%= dirs.src %>/generated.d.ts'],
        tasks: ['update-ts-references', 'ts:default']
      },
      jade_templates: {
        files: ['<%= dirs.src %>/**/*.tpl.jade'],
        tasks: ['html2js:default']
      },
      jade: {
        files: ['<%= dirs.src %>/**/*.jade', '!<%= dirs.src %>/**/*.tpl.jade'],
        tasks: ['jade:default']
      },
      sass: {
        files: ['<%= dirs.src %>/**/*.sass'],
        tasks: ['sass:default']
      }
    },

    // https://www.npmjs.com/package/grunt-contrib-connect
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          livereload: 35729,
          open: true,
          base: '<%= dirs.build.wd %>'
        }
      }
    }
  });

  grunt.registerTask('install', ['bower:install', 'run:tsd_install']);

  grunt.registerTask('continuous-development', ['clean:build', 'install', 'update-ts-references', 'ts:default', 'jade:default', 'html2js:default', 'sass:default', 'connect:livereload', 'watch']);

  grunt.registerTask('default', ['continuous-development']);
}
