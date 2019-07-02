(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var fs = require('fs');
  var path = require('path');
  var globby = require('globby');
  var sass = require('node-sass');

  nx.nakeSass = function(inPatterns, inDest, inOptions) {
    var files = globby.sync(inPatterns);
    files.forEach(function(file) {
      var data = fs.readFileSync(file).toString();
      var dest = path.join(inDest, '/', file).replace('.scss', '.css');
      var result = sass.renderSync(
        nx.mix(
          {
            data: data,
            outputStyle: 'compressed'
          },
          inOptions
        )
      );

      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, result.css);
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.nakeSass;
  }
})();
