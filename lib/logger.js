/* commander/autocmdr component
 * Adds a winston logger as program.log.  Adds .option('-d, --debug', "enable debugger") to the program.
 * To use add require('autocmdr/lib/logger.js')(program) where program is a commander or autocmdr program.
 */

module.exports = function (program) {
  'use strict';

  var winston = require('winston');

  program.option('-d, --debug', "enable debugger");
  // TODO: --no-color

  var argv = program.normalize(process.argv);
  program.debug = argv.indexOf('-d') > -1 || argv.indexOf('--debug') > -1; // Need this early

  winston.cli();
  winston.level = (program.debug) ? 'debug' : 'info';

  program.log = winston;

  if (program.debug) {
    program.log.debug('Debug logging is on');
  }

};
