// commander/autocmdr plugin


module.exports = function (program, opts) {

	opts = opts || {};
	opts.name = opts.name || program._name || require('path').basename(process.mainModule.filename);

	var didYouMean = require('didYouMean');

	program
		.on('*', function(name) { 
			program.logger.log('warn', '\''+name+'\' is not a known command. See \''+opts.name+' --help\'.');

			var d = didYouMean(name.toString(), program.commands, "_name");

			if (d)
				program.logger.log('warn', 'Did you mean:', d, '?');

		});

}