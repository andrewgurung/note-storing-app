// Angular module named 'App'
// which is linked to HTML element through ngApp directive
angular.module('App', [])
.directive('markdown', function() { // markdown directive
  // Creates Showdown converter to convert plain text to Markdown
  var converter = new Showdown.converter();

  // Return directive settings
  return {
    // Custom scope that expects value to be assigned to a markdown attribute
    scope: {
      markdown: '@'
    },

    // Use by angular as part of the rendering process
    link: function(scope, element, attrs) {
      // Scope watcher to update any model changes
      scope.$watch('markdown', function() {
        // Takes value inside `markdown` attribute and converts into markdown html
        var content = converter.makeHtml(attrs.markdown);
        // Injects converted content into the element where `markdown` attr is defined
        element.html(content);
      });
    }
  }
});
