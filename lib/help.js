/* commander/autocmdr component
 * This component will use didyoumean to add a "Did you mean:" message to your application when an unknown command is given.
 * To use add require('autocmdr/lib/help.js')(program) where program is a commander or autocmdr program.
 */

module.exports = function (program, opts) {
  'use strict';

  opts = opts || {};
  opts.name = opts.name || program._name || require('path').basename(process.mainModule.filename);

  var didYouMean = require('didyoumean');

  program
    .on('*', function(name) {
      program.log.error('\''+name+'\' is not a known command. See \''+opts.name+' --help\'.');

      var d = didYouMean(name.toString(), program.commands, "_name");

      if (d)
        program.log.info('Did you mean:', d, '?');

      process.exit(1);

    });

};
