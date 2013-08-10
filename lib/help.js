// commander/autocmdr plugin


module.exports = function (program, opts) {

	opts = opts || {};

	var didYouMean = require('didYouMean');

	program
		.on('*', function(name) { 
			program.logger.log('warn', '\''+name+'\' is not a known command. See \''+program._name+' --help\'.');

			var d = didYouMean(name.toString(), program.commands, "_name");

			if (d)
				program.logger.log('warn', 'Did you mean:', d, '?');

		});

}