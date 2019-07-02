var nx = require('next-js-core2');
require('../src/next-nake-sass');

test('nx.nakeSass', function() {
  nx.nakeSass(['test/*.scss'], 'dist');
});
