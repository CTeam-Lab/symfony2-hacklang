module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-bower-task'
  grunt.loadNpmTasks 'grunt-jscs'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    env: grunt.option('env') || process.env.GRUNT_ENV || 'dev'

    liveReload: !grunt.option('no-live-reload')

    noWatch: grunt.option('no-watch')

    dirs:
      assets:
        wd: 'assets'
        bower: '<%= dirs.assets.wd %>/bower'
        img: '<%= dirs.assets.wd %>/img'
        sass: '<%= dirs.assets.wd %>/sass',
        fonts: '<%= dirs.assets.wd %>/fonts'
      angular_app: 'src'
      public: 'public'
      tmp:
        wd: '<%= dirs.public %>/tmp'
        js:
          wd: '<%= dirs.tmp.wd %>/js'
          angular_client: '<%= dirs.tmp.js.wd %>/angular-client'
          vendors: '<%= dirs.tmp.js.wd %>/vendors'
        css: '<%= dirs.tmp.wd %>/css'
      build:
        wd: '<%= dirs.public %>/build'
        js: '<%= dirs.build.wd %>/js'
        css: '<%= dirs.build.wd %>/css'
        fonts: '<%= dirs.build.wd %>/fonts'
        img: '<%= dirs.build.wd %>/img'

    bower:
      install:
        options:
          targetDir: '<%= dirs.assets.bower %>'
          cleanTargetDir: true
          cleanBowerDir: true
          layout: 'byComponent'
          bowerOptions:
            production: grunt.option('env') || process.env.GRUNT_ENV || 'dev'

    compass:
      dev:
        options:
          sassDir: '<%= dirs.assets.sass %>'
          cssDir: '<%= dirs.tmp.css %>'
          raw: 'preferred_syntax = :sass\noutput_style = :expanded\nenvironment = :development\n'

    concat:
      vendors:
        files: [
          '<%= dirs.tmp.js.vendors %>/vendor.js': [
            '<%= dirs.assets.bower %>/angular/angular.js',
            '<%= dirs.assets.bower %>/angular-resource/angular-resource.js',
            '<%= dirs.assets.bower %>/angular-ui-router/angular-ui-router.js',
            '<%= dirs.assets.bower %>/angular-aria/angular-aria.js',
            '<%= dirs.assets.bower %>/angular-animate/angular-animate.js',
            '<%= dirs.assets.bower %>/angular-material/angular-material.js',
            '<%= dirs.assets.bower %>/underscore/underscore.js'
          ]
        ]
      angular_client:
        files: [
          '<%= dirs.tmp.js.angular_client %>/angular.js': '<%= dirs.angular_app %>/**/*.js'
        ]
      build_js:
        files: [
          '<%= dirs.build.js %>/client.js': [
            '<%= dirs.tmp.js.vendors %>/vendor.js',
            '<%= dirs.tmp.js.angular_client %>/angular.js'
          ]
        ]
      build_css:
        files: [
          '<%= dirs.build.css %>/style.css': [
            '<%= dirs.assets.bower %>/angular-material/angular-material.css',
            '<%= dirs.tmp.css %>/app.css'
          ]
        ]
      build:
        files: [
          '<%= dirs.build.js %>/client.js': [
            '<%= dirs.tmp.js.vendors %>/vendor.js',
            '<%= dirs.tmp.js.angular_client %>/angular.js'
          ],
          '<%= dirs.build.css %>/style.css': [
            '<%= dirs.assets.bower %>/angular-material/angular-material.css',
            '<%= dirs.tmp.css %>/app.css'
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
          pretty: true,
          doctype: 'html'
        files:[
          expand: true
          cwd: '<%= dirs.angular_app %>'
          src: '**/*.jade'
          dest: '<%= dirs.build.wd %>'
          ext: '.html'
        ]

    copy:
      img:
        expand: true
        flatten: true
        cwd: '<%= dirs.assets.img %>'
        src: ['**/*']
        dest: '<%= dirs.build.img %>'
      fonts:
        expand: true
        flatten: true
        cwd: '<%= dirs.assets.fonts %>'
        src: ['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.otf']
        dest: '<%= dirs.build.fonts %>'

    jshint:
      src: '<%= dirs.angular_app %>/**/*.js'

    jscs:
      src: '<%= dirs.angular_app %>/**/*.js'

    clean:
      all: '<%= dirs.public %>'
      tmp_css: '<%= dirs.tmp.wd %>/css'
      tmp_js: '<%= dirs.tmp.wd %>/js'
      tmp_js_vendors: '<%= dirs.tmp.js.vendors %>'
      tmp_js_angular_client: '<%= dirs.tmp.js.angular_client %>'
      build: '<%= dirs.build.wd %>'

    watch:
      jade:
        files: ['<%= dirs.angular_app %>/**/*.jade']
        tasks: ['jade']
      sass:
        files: ['<%= dirs.assets.sass %>/**/*.sass']
        tasks: ['compass', 'concat:build_css']
      angular:
        files: ['<%= dirs.angular_app %>/**/*.js']
        tasks: ['build-angular-client', 'concat:build_js']

  isDevEnv = ->
    grunt.config.get('env') == 'dev'

  noWatch = ->
    grunt.config.get('noWatch') || !isDevEnv()

  # when watch is running we should build the vendors only once
  vendorTasks = ['clean:tmp_js_vendors', 'concat:vendors']
  grunt.registerTask 'build-vendors', vendorTasks

  angularClientTasks = ['clean:tmp_js_angular_client', 'jshint', 'jscs', 'concat:angular_client']
  grunt.registerTask 'build-angular-client', angularClientTasks

  javascriptTasks = ['build-vendors', 'build-angular-client', 'concat:build_js']
  javascriptTasks.push('uglify') unless isDevEnv()
  javascriptTasks.push('clean:tmp_js') unless isDevEnv()
  grunt.registerTask 'javascript', javascriptTasks

  stylesheetsTasks = ['compass', 'concat:build_css']
  stylesheetsTasks.push('clean:tmp_css') unless isDevEnv()
  grunt.registerTask 'stylesheets', stylesheetsTasks

  grunt.registerTask 'doc-gen', 'Generate documentation using Dgeni', ->
    Dgeni = require('dgeni')
    done = @.async()
    dgeni = new Dgeni([require('./docs/config/index')])
    dgeni.generate().then(done)

  grunt.registerTask 'build', ['clean:all', 'stylesheets', 'javascript', 'jade', 'copy:img', 'copy:fonts']

  defaultTasks = ['build']
  defaultTasks.push('watch') if isDevEnv() && !noWatch()
  grunt.registerTask 'default', defaultTasks
