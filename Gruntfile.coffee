module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-bower-task'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-copy'

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    env: grunt.option('env') || process.env.GRUNT_ENV || 'dev'

    liveReload: !grunt.option('no-live-reload')

    noWatch: grunt.option('no-watch')

    dirs:
      bower: 'app/Resources/public/bower'
      angular_app: 'app/Resources/AngularClient'
      assets: 'web/dist'
      tmp:
        wd: '<%= dirs.assets %>/tmp'
        js:
          wd: '<%= dirs.tmp.wd %>/js'
          angular_client: '<%= dirs.tmp.js.wd %>/angular-client'
          vendors: '<%= dirs.tmp.js.wd %>/vendors'
      build:
        wd: '<%= dirs.assets %>/build'
        js: '<%= dirs.build.wd %>/js'
        css: '<%= dirs.build.wd %>/css'
        fonts: '<%= dirs.build.wd %>/fonts'

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
      angular_client:
        expand: true
        cwd: '<%= dirs.angular_app %>'
        src: '**/*.coffee'
        dest: '<%= dirs.tmp.js.angular_client %>'
        ext: '.js'

    concat:
      vendors:
        files: [
          '<%= dirs.tmp.js.vendors %>/vendor.js': [
            '<%= dirs.bower %>/angular/angular.js',
            '<%= dirs.bower %>/angular-resource/angular-resource.js',
            '<%= dirs.bower %>/angular-route/angular-route.js',
            '<%= dirs.bower %>/jquery/jquery.js',
            '<%= dirs.bower %>/underscore/underscore.js',
            '<%= dirs.bower %>/bootstrap/bootstrap.js'
          ]
        ]
      angular_client:
        files: [
          '<%= dirs.tmp.js.angular_client %>/angular.js': '<%= dirs.tmp.js.angular_client %>/**/*.js'
        ]
      build:
        files: [
          '<%= dirs.build.js %>/client.js': [
            '<%= dirs.tmp.js.vendors %>/vendor.js',
            '<%= dirs.tmp.js.angular_client %>/angular.js'
          ],
          '<%= dirs.build.css %>/style.css': [
            '<%= dirs.bower %>/bootstrap/bootstrap.css',
            '<%= dirs.bower %>/font-awesome/font-awesome.css',
            '<%= dirs.bower %>/../css/screen.css',
            '<%= dirs.bower %>/../css/hl-styles/monokai_sublime.css'
          ]
        ]

    uglify:
      build:
        expand: true
        cwd: '<%= dirs.build.wd %>'
        src: ['app.js']
        dest: '<%= dirs.build.wd %>'
        ext: '.js'

    jade:
      build:
        options:
          pretty: true
        files:[
          expand: true
          cwd: '<%= dirs.angular_app %>'
          src: '**/*.jade'
          dest: '<%= dirs.build.wd %>'
          ext: '.html'
        ]

    copy:
      fonts:
        expand: true
        flatten: true
        cwd: '<%= dirs.bower %>'
        src: ['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.otf']
        dest: '<%= dirs.build.fonts %>'

    clean:
      all: '<%= dirs.assets %>'
      tmp: '<%= dirs.tmp.wd %>'
      tmp_js_vendors: '<%= dirs.tmp.js.vendors %>'
      tmp_js_angular_client: '<%= dirs.tmp.js.angular_client %>'
      build: '<%= dirs.build.wd %>'

    watch:
      jade:
        files: ['<%= dirs.angular_app %>/**/*.jade']
        tasks: ['jade']
      angular:
        files: ['<%= dirs.angular_app %>/**/*.coffee']
        tasks: ['build-angular-client', 'concat:build']


  isDevEnv = ->
    grunt.config.get('env') == 'dev'

  noWatch = ->
    grunt.config.get('noWatch') || !isDevEnv()

  # when watch is running we should build the vendors only once
  vendorTasks = ['clean:tmp_js_vendors', 'concat:vendors']
  grunt.registerTask 'build-vendors', vendorTasks

  angularClientTasks = ['clean:tmp_js_angular_client', 'coffee:angular_client', 'concat:angular_client']
  grunt.registerTask 'build-angular-client', angularClientTasks

  javascriptTasks = ['build-vendors', 'build-angular-client', 'concat:build']
  javascriptTasks.push('uglify') unless isDevEnv()
  grunt.registerTask 'javascript', javascriptTasks

  grunt.registerTask 'build', ['clean:all', 'javascript', 'jade', 'copy:fonts']

  defaultTasks = ['build']
  defaultTasks.push('watch') if isDevEnv() && !noWatch()
  grunt.registerTask 'default', defaultTasks
