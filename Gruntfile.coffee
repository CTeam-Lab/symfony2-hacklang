module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    env: grunt.option('env') || process.env.GRUNT_ENV || 'dev'

    liveReload: !grunt.option('no-live-reload')

    dirs:
      bower: 'app/Resources/public/bower'
      angular_app: 'app/Resources/public/angular'
      assets: 'web/dist'
      assets_tmp: '<%= dirs.assets %>/tmp'
      js_tmp_dir:
        wd: '<%= dirs.assets_tmp %>/js'
        angular: '<%= dirs.js_tmp_dir.wd %>/angular'

    bower:
      install:
        options:
          targetDir: '<%= dirs.bower %>'
          cleanTargetDir: true
          cleanBowerDir: true
          layout: 'byComponent'
          bowerOptions:
            production: grunt.option('env') || process.env.GRUNT_ENV || 'dev'

    coffee:
      app:
        expand: true
        cwd: '<%= dirs.angular_app %>'
        src: '**/*.coffee'
        dest: '<%= dirs.js_tmp_dir.angular %>'
        ext: '.js'

    concat:
      angular:
        files: [
          '<%= dirs.js_tmp_dir.wd %>/angular.js': '<%= dirs.js_tmp_dir.angular %>/**/*.js'
        ]
      build:
        files: [
          '<%= dirs.assets %>/app.js': [
            '<%= dirs.bower %>/angular/angular.js',
            '<%= dirs.bower %>/angular-resource/angular-resource.js',
            '<%= dirs.bower %>/angular-route/angular-route.js',
            '<%= dirs.bower %>/jquery/jquery.js',
            '<%= dirs.bower %>/underscore/underscore.js',
            '<%= dirs.js_tmp_dir.wd %>/angular.js'
          ]
        ]

    clean:
      all: '<%= dirs.assets %>'
      tmp_js: ['<%= dirs.js_tmp_dir.wd %>/**/*.js']

    watch:
      angular:
        files: ['<%= dirs.angular_app %>/**/*.coffee']
        tasks: ['javascript']

  grunt.loadNpmTasks 'grunt-bower-task'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.registerTask 'javascript', ['coffee', 'concat', 'clean:tmp_js']

  grunt.registerTask 'build', ['clean:all', 'javascript']

  grunt.registerTask 'default', ['build', 'watch']
