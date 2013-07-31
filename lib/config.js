// commander/autocmdr plugin

// Adds conf

var path = require('path');

module.exports = function (program) {

	var nconf = require('nconf');

	var file = path.join(process.mainModule.filename, '../../config.json');

	program.logger.debug('Loading config from ', file);

	var store = nconf.file({ 'file': file }).load();

	//function _set(key, value) {
	//	nconf.set(key, value);
	//	nconf.save();
	//}

	//function _get(key) {
	//	nconf.get(key);
	//}

	//_set('database', 6000 );

	function _keyvalue(val) {
		//console.log('_keyvalue');
	  return val.split('=');
	}

	program
		.command('config')
		.option('--list')
		.option('--get <key>')
		.option('--add <key=value>', 'A key=value pair', _keyvalue)
		.description('config')
		.action(function(){
			opts = arguments[arguments.length -1];


			if (opts.list) {
				console.log(nconf.load());
			} else if (opts.get) {
				console.log(nconf.get(opts.get));
			} else if (opts.add) {
				//console.log(opts.add);
				nconf.set(opts.add[0], opts.add[1]);
				nconf.save();
				console.log(nconf.save());
			}

			

		});
	
};