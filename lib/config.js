/* commander/autocmdr component
 * Adds config command to commander.js program.
 * To use add require('autocmdr/lib/config.js')(program) where program is a commander or autocmdr program.
 */

module.exports = function (program, opts) {
	var path = require('path');

	opts = opts || {};
	opts.name = opts.name || program._name || require('path').basename(process.mainModule.filename);
	opts.path = opts.path || require('path').join(process.mainModule.filename, '../../.'+opts.name);

	var nconf = require('nconf');

	program.log.debug('Loading config from ', opts.path);

	var store = nconf.file({ 'file':  opts.path }).load();

	function _config(key, value, opts){
		if (key && value !== null) {

			if (value === "") {
				program.log.debug('Clearing key',key);
				nconf.clear(key);
			} else {
				program.log.debug('Setting key',key,'to',value);
				nconf.set(key, value);
			}
			nconf.save();
			console.log(nconf.save());
		} else if (key) {
			program.log.debug('Retrieving key',key);
			console.log(nconf.get(key));
		} else {
			program.log.debug('Listing all kay-values');
			console.log(nconf.load());
		}

	}

	program
		.command('config [key] [value]')
		.description('Get and set options')
		.action(_config);

	program.config = nconf;
	
};