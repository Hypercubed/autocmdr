/* commander/autocmdr component
 * This component is what loads the cmds/ modules.
 * To use add require('autocmdr/lib/loader.js')(program) where program is a commander or autocmdr program.
 */

module.exports = function (program, opts) {
  'use strict';

  // Node.js
  var path            = require('path');
  var fs              = require('fs');

  opts = opts || {};
  opts.name = opts.name || program._name || require('path').basename(process.mainModule.filename);
  opts.path = opts.path || require('path').join(process.mainModule.filename, '../../cmds/');

  function _require(filepath) {  // TODO: Prevent loading twice

    if(typeof filepath == "string") {   // TODO: Don't load same command twice?
      program.log.debug('Loading ',filepath);

      var _f = require(filepath);
      if (typeof _f == "function")
        _f(program);    // This adds the command to this program
    }

    return program;
  }

  // Load tasks in a given folder.
  function _loadCmds(dirpath) {

    if (fs.existsSync(dirpath) && fs.statSync(dirpath).isDirectory()) {
      program.log.debug('Loading commands from '+dirpath);
      fs.readdirSync(dirpath).forEach(function(filename) {
        var filepath = path.join(dirpath,filename);
        _require(filepath);
      });
    } else {
      program.log.debug('Directory not found '+dirpath);
    }

    return program;
  }

  if (opts.path) {
    _loadCmds(opts.path);

    var _lib = path.join(opts.path, '../'+opts.name+'.js');

    if (fs.existsSync(_lib))
      _require(path.join(opts.path, '../'+opts.name+'.js'));  // TODO: make filename an option?
  }

};
