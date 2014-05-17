/* commander/autocmdr component
 * Gets name, description, and version by parsing a nearby package.json.
 * Adds "Bug reports, suggestions, updates" text to --help
 * To use add require('autocmdr/lib/package.js')(program) where program is a commander or autocmdr program.
 */

module.exports = function (program, opts) {
  'use strict';

  var path = require('path');
  var fs = require('fs');

  opts = opts || {};
  opts.name = opts.name || program._name || require('path').basename(process.mainModule.filename);
  opts.path = opts.path || path.join(process.mainModule.filename, '../../package.json');

  if (!fs.existsSync(opts.path)) {
    program.log.debug('Package not found at', opts.path);
    return;
  }

  program.log.debug('Loading package from ', opts.path);

  var pkg = require(opts.path);

  program._name = opts.name;

  program
    .version(pkg.version)
    .description(pkg.description);

  if (pkg.bugs && pkg.bugs.url) {
    program
      .on('--help', function(){
        console.log('  Bug reports, suggestions, updates:');
        console.log('  ', pkg.bugs.url);
      });
  }

};
