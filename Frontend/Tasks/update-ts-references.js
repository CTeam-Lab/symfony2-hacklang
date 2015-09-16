module.exports = function (grunt) {
  'use strict';

  var packer = require('ts-packer');

  grunt.registerMultiTask('update-ts-references', 'Adds references to dest file for all src ts files', function () {
    this.files.forEach(function (file) {
      packer.load({
        src: file.orig.src,
        dest: file.orig.dest
      });
    });

    grunt.log.writeln('done without errors');
  });
};
