"use strict";

module.exports = function defaultDeployment(getVersion) {
  return {
    name: 'default',
    examples: {
      commonFiles: {
        scripts: [ '../../../angular.min.js' ]
      },
      dependencyPath: '../../../'
    },
    scripts: [
      'components/angular-' + getVersion('angular') + '/angular.js',
      'components/angular-resource-' + getVersion('angular-resource') + '/angular-resource.js',
      'components/angular-route-' + getVersion('angular-route') + '/angular-route.js',
      'components/angular-cookies-' + getVersion('angular-cookies') + '/angular-cookies.js',
      'components/angular-sanitize-' + getVersion('angular-sanitize') + '/angular-sanitize.js',
      'components/angular-touch-' + getVersion('angular-touch') + '/angular-touch.js',
      'components/angular-animate-' + getVersion('angular-animate') + '/angular-animate.js',
      'components/marked-' + getVersion('marked', 'docs/node_modules', 'package.json') + '/lib/marked.js',
      'js/angular-bootstrap/bootstrap.js',
      'js/angular-bootstrap/dropdown-toggle.js',
      'components/lunr.js-' + getVersion('lunr.js') + '/lunr.js',
      'components/google-code-prettify-' + getVersion('google-code-prettify') + '/src/prettify.js',
      'components/google-code-prettify-' + getVersion('google-code-prettify') + '/src/lang-css.js',
      // 'js/versions-data.js',
      'js/pages-data.js',
      'js/nav-data.js',
      'js/docs.js'
    ],
    stylesheets: [
      'components/bootstrap-' + getVersion('bootstrap') + '/css/bootstrap.min.css',
      'components/open-sans-fontface-' + getVersion('open-sans-fontface') + '/open-sans.css',
      'css/prettify-theme.css',
      'css/docs.css',
      'css/animations.css'
    ]
  };
};
