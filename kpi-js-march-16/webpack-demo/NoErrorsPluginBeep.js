function NoErrorsPluginBeep() { }

NoErrorsPluginBeep.prototype.apply = function(compiler) {
  compiler.plugin('should-emit', function notify(compilation) {
    if(compilation.errors.length > 0) {
      process.stdout.write('Error \x07');
      return false;
    }
  });
  compiler.plugin('compilation', function notify(compilation) {
    if(compilation.errors.length > 0) {
      process.stdout.write('Error \x07');
      return false;
    }
  });
};
module.exports = NoErrorsPluginBeep;
