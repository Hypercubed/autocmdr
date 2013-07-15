module.exports = function (program) {
	var Logger 			= require('caterpillar').Logger;
	var Filter 			= require('caterpillar-filter').Filter;
	var Human 			= require('caterpillar-human').Human;

	program.option('-d, --debug', "enable debugger");

	var argv = program.normalize(process.argv);
	program.debug = argv.indexOf('-d') > -1; // Need this early

	// Setup logger
	program.logger = new (Logger)({level: (program.debug) ? 7 : 6 })
	program.logger.pipe(new (Filter)()).pipe(new (Human)()).pipe(process.stdout);

	
	if (!global.logger) global.logger = global.logger || program.logger;

	program.on('debug', function() {
		program.logger.log('debug', 'Debug logging is on');
	});

}