(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var fs = require('fs');
  var globby = require('globby');
  var sass = require('node-sass');

  nx.nakeSass = function(inPatterns, inDest, inOptions) {
    var files = globby.sync(inPatterns, inOptions);
    files.forEach(function(file) {
      var content = fs.readFileSync(file).toString();
      // var dest = path.join(inDest, '/', file);
      // fs.mkdirSync(path.dirname(dest), { recursive: true });
      var newContent = sass.renderSync(nx.mix({ data: content }, inOptions));
      console.log('new Content', newContent.css);
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.nakeSass;
  }
})();
