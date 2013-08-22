/* commander/autocmdr component
 * Adds a winston logger as program.log.  Adds .option('-d, --debug', "enable debugger") to the program.
 * To use add require('autocmdr/lib/logger.js')(program) where program is a commander or autocmdr program.
 */

module.exports = function (program) {

	program.option('-d, --debug', "enable debugger");
	// TODO: --no-color

	var argv = program.normalize(process.argv);
	program.debug = argv.indexOf('-d') > -1; // Need this early

	var winston = require('winston');

	var logger = new winston.Logger({
		transports: [
			new (winston.transports.Console)({ level: (program.debug) ? 'debug' : 'info' })
		]
	});

	logger.cli();

	if (program.debug) {
		logger.debug('Debug logging is on');
	}

	program.log = logger;

};