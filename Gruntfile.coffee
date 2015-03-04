module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-bower-task'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    env: grunt.option('env') || process.env.GRUNT_ENV || 'dev'

    liveReload: !grunt.option('no-live-reload')

    noWatch: grunt.option('no-watch')

    dirs:
      bower: 'app/Resources/public/bower'
      angular_app: 'app/Resources/public/angular'
      js_assets:
        wd: 'web/dist'
        vendors: '<%= dirs.js_assets.wd %>/vendors'
        angular_client: '<%= dirs.js_assets.wd %>/angular-client'
      js_assets_tmp:
        wd: '<%= dirs.js_assets.wd %>/tmp'
        angular_client: '<%= dirs.js_assets_tmp.wd %>/angular-client'

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
        dest: '<%= dirs.js_assets_tmp.angular_client %>'
        ext: '.js'

    concat:
      vendors:
        files: [
          '<%= dirs.js_assets.vendors %>/vendor.js': [
            '<%= dirs.bower %>/angular/angular.js',
            '<%= dirs.bower %>/angular-resource/angular-resource.js',
            '<%= dirs.bower %>/angular-route/angular-route.js',
            '<%= dirs.bower %>/jquery/jquery.js',
            '<%= dirs.bower %>/underscore/underscore.js'
          ]
        ]
      angular_client:
        files: [
          '<%= dirs.js_assets.angular_client %>/angular.js': '<%= dirs.js_assets_tmp.angular_client %>/**/*.js'
        ]
      build:
        files: [
          '<%= dirs.js_assets.wd %>/app.js': [
            '<%= dirs.js_assets.vendors %>/vendor.js',
            '<%= dirs.js_assets.angular_client %>/angular.js'
          ]
        ]

    uglify:
      build:
        expand: true
        cwd: '<%= dirs.assets %>'
        src: ['app.js']
        dest: '<%= dirs.assets %>'
        ext: '.js'

    clean:
      all: '<%= dirs.js_assets.wd %>'
      js_assets: '<%= dirs.js_assets.wd %>'
      js_assets_vendors: '<%= dirs.js_assets.vendors %>'
      js_assets_angular_client: '<%= dirs.js_assets.angular_client %>'
      js_assets_tmp: '<%= dirs.js_assets_tmp %>'

    watch:
      angular:
        files: ['<%= dirs.angular_app %>/**/*.coffee']
        tasks: ['build-angular-client', 'concat:build', 'clean:js_assets']

  isDevEnv = ->
    grunt.config.get('env') == 'dev'

  noWatch = ->
    grunt.config.get('noWatch') || !isDevEnv()

  # when watch is running we should build the vendors only once
  vendorTasks = ['clean:js_assets_vendors', 'concat:vendors']
  grunt.registerTask 'build-vendors', vendorTasks

  angularClientTasks = ['clean:js_assets_tmp', 'coffee:angular_client', 'clean:js_assets_angular_client', 'concat:angular_client']
  grunt.registerTask 'build-angular-client', angularClientTasks

  javascriptTasks = ['build-vendors', 'build-angular-client', 'concat:build']
  javascriptTasks.push('uglify') unless isDevEnv()
  javascriptTasks.push('clean:js_assets')
  grunt.registerTask 'javascript', javascriptTasks

  grunt.registerTask 'build', ['clean:all', 'javascript']

  defaultTasks = ['build']
  defaultTasks.push('watch') if isDevEnv() && !noWatch()
  grunt.registerTask 'default', defaultTasks
