/*!
 * name: next-nake-sass
 * url: https://github.com/afeiship/next-nake-sass
 * version: 1.0.0
 * date: 2019-07-02T15:28:19.187Z
 * license: MIT
 */

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

//# sourceMappingURL=next-nake-sass.js.map
