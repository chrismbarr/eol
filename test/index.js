(function(root) {
  function contains(str, needle) {
    return !!~str.indexOf(needle);
  }

  var common = typeof module != 'undefined' && !!module.exports;
  var aok = common ? require('aok') : root.aok;
  var eol = common ? require('../src') : root.eol;
  var platform = typeof process != 'undefined' && process.platform;
  var meths = ['lf', 'cr', 'crlf', 'normalize'];
  var chars = ['\n', '\r', '\r\n', 'win32' === platform ? '\r\n' : '\n'];
  var sample = ' ' + chars.join() + 'text' + chars.join();
  
  aok.fail(meths, function(method, i) {
    if (!contains('ab', 'a')) return void aok.warn('contains() does not return expected result.');
    if (!contains(sample, chars[i])) return void aok.warn('Sample lacks the needed characters.');
    return true;
  }, aok, 1);

  aok.pass(meths, function(method, i) {
    var normalized = eol[method](sample);
    aok(method + ' retains', contains(normalized, chars[i]));
    aok(method + ' normalizes', !aok.fail(chars, function(c) {
      return contains(chars[i], c) === contains(normalized, c);
    }));
    return eol.normalize(sample) === normalized;
  });
  
  aok('normalize agress', 2 === aok.pass(meths, function(method) {
    return eol.normalize(sample) === eol[method](sample);
  }));
}(this));