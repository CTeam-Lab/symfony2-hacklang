"use strict";

var path = require('canonical-path');
var packagePath = __dirname;

var Package = require('dgeni').Package;

// Create and export a new Dgeni package called angularjs. This package depends upon
// the ngdoc, nunjucks, and examples packages defined in the dgeni-packages npm module.
module.exports = new Package('jovago-client', [
  require('dgeni-packages/ngdoc'),
  require('dgeni-packages/nunjucks')
])

// .factory(require('./services/errorNamespaceMap'))
// .factory(require('./services/getMinerrInfo'))
.factory(require('./services/getVersion'))
// .factory(require('./services/gitData'))

.factory(require('./services/deployments/default'))

.factory(require('./inline-tag-defs/type'))


// .processor(require('./processors/error-docs'))
.processor(require('./processors/index-page'))
// .processor(require('./processors/keywords'))
.processor(require('./processors/pages-data'))
// .processor(require('./processors/versions-data'))


.config(function(dgeni, log, readFilesProcessor, writeFilesProcessor) {
  dgeni.stopOnValidationError = true;
  dgeni.stopOnProcessingError = true;

  log.level = 'info';

  readFilesProcessor.basePath = path.resolve(packagePath, '../..');
  readFilesProcessor.sourceFiles = [
    { include: 'src/**/*.js', basePath: 'src' },
    { include: 'docs/content/**/*.ngdoc', basePath: 'docs/content' }
  ];

  writeFilesProcessor.outputFolder = 'public/build/docs';
})

// .config(function(parseTagsProcessor) {
  // parseTagsProcessor.tagDefinitions.push(require('./tag-defs/tutorial-step'));
  // parseTagsProcessor.tagDefinitions.push(require('./tag-defs/sortOrder'));
// })

.config(function(inlineTagProcessor, typeInlineTagDef) {
  inlineTagProcessor.inlineTagDefinitions.push(typeInlineTagDef);
})

.config(function(templateFinder) {
  templateFinder.templateFolders.unshift(path.resolve(packagePath, 'templates'));
})

.config(function(computePathsProcessor, computeIdsProcessor, log) {
  computePathsProcessor.pathTemplates.push({
    docTypes: ['overview'],
    getPath: function(doc) {
      var docPath = path.dirname(doc.fileInfo.relativePath);
      if ( doc.fileInfo.baseName !== 'index' ) {
        docPath = path.join(docPath, doc.fileInfo.baseName);
      }
      return docPath;
    },
    outputPathTemplate: 'partials/${path}.html'
  });

  computePathsProcessor.pathTemplates.push({
    docTypes: ['indexPage'],
    pathTemplate: '.',
    outputPathTemplate: '${id}.html'
  });

  computePathsProcessor.pathTemplates.push({
    docTypes: ['module'],
    pathTemplate: '${area}/${name}',
    outputPathTemplate: 'partials/${area}/${name}.html'
  });

  computePathsProcessor.pathTemplates.push({
    docTypes: ['componentGroup' ],
    pathTemplate: '${area}/${moduleName}/${groupType}',
    outputPathTemplate: 'partials/${area}/${moduleName}/${groupType}.html'
  });

  computeIdsProcessor.idTemplates.push({
    docTypes: ['overview', 'indexPage'],
    getId: function(doc) { return doc.fileInfo.baseName; },
    getAliases: function(doc) { return [doc.id]; }
  });
})

.config(function(checkAnchorLinksProcessor) {
  checkAnchorLinksProcessor.base = '/';
  // We are only interested in docs that have an area (i.e. they are pages)
  checkAnchorLinksProcessor.checkDoc = function(doc) { return doc.area; };
})


.config(function(
  generateIndexPagesProcessor,
  defaultDeployment
) {
  generateIndexPagesProcessor.deployments = [
    defaultDeployment
  ];
});
