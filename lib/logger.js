// commander/autocmdr plugin
// To use call `require('autocmdr/loader.js')(program)` where program is a commander or autocmdr Command;
//
// adds a winston logger as program.logger
// adds .option('-d, --debug', "enable debugger");

module.exports = function (program) {

	program.option('-d, --debug', "enable debugger");

	var argv = program.normalize(process.argv);
	program.debug = argv.indexOf('-d') > -1; // Need this early

	// Caterpiller
	/* 
	var Logger 			= require('caterpillar').Logger;
	var Filter 			= require('caterpillar-filter').Filter;
	var Human 			= require('caterpillar-human').Human;

	// Setup logger
	program.logger = new (Logger)({level: (program.debug) ? 7 : 6 })
	program.logger.pipe(new (Filter)()).pipe(new (Human)()).pipe(process.stdout);

	*/

	var winston = require('winston');

	// TODO: Start using program.log
	logger = program.logger = new winston.Logger({
	    transports: [
	      new (winston.transports.Console)({ level: (program.debug) ? 'debug' : 'info' })
	    ]
	  });

	program.logger.cli();

	// Remove this ASAP
	if (!global.logger) global.logger = global.logger || program.logger;

	if (program.debug) {
		program.logger.debug('Debug logging is on');
	};

}