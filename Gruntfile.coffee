module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    env: grunt.option('env') || process.env.GRUNT_ENV || 'dev'

    liveReload: !grunt.option('no-live-reload')

    bower:
      install:
        options:
          targetDir: './app/Resources/public/vendor'
          cleanTargetDir: true
          cleanBowerDir: true
          layout: 'byComponent'
          bowerOptions:
            production: grunt.option('env') || process.env.GRUNT_ENV || 'dev'

  grunt.loadNpmTasks 'grunt-bower-task'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.registerTask 'build', ['bower:install']

  grunt.registerTask 'default', ['build']  
