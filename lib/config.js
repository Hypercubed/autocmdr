// commander/autocmdr plugin

// Adds conf

var path = require('path');

module.exports = function (program, opts) {
	opts = opts || {};
	opts.name = opts.name || program._name || require('path').basename(process.mainModule.filename);
	opts.path = opts.path || require('path').join(process.mainModule.filename, '../../.'+opts.name);

	var nconf = require('nconf');

	program.logger.debug('Loading config from ', opts.path);

	var store = nconf.file({ 'file':  opts.path }).load();

	function _config(key, value, opts){

			if (key && value) {
				nconf.set(key, value);
				nconf.save();
				console.log(nconf.save());				
			} else if (key) {
				console.log(nconf.get(opts.get));
			} else {
				console.log(nconf.load());
			}

		};

	program
		.command('config [key] [value]')
		.description('Get and set options')
		.action(_config);

	program.config = nconf;
	
};