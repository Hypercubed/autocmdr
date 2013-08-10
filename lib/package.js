// commander/autocmdr plugin
// To use call `require('autocmdr/package.js')(program)` where program is a commander or autocmdr Command;
//
// gets name, description, and version by parsing a nearby package.json
// Addes "Bug reports, suggestions, updates" text to --help

var path = require('path');
var fs = require('fs');

module.exports = function (program, opts) {

	opts = opts || {}
	opts.path = opts.path || path.join(process.mainModule.filename, '../../package.json');
	

	//require('fs').exists(opts.path, function (exists) {

		if (!fs.existsSync(opts.path)) {
			program.logger.debug('Package not found at', opts.path);
			return;
		}

		program.logger.debug('Loading package from ', opts.path);

		var pkg = program.package = require(opts.path);
		
		program._name = pkg.name;

		program
			.version(pkg.version)
			.description(pkg.description);

		if (pkg.bugs && pkg.bugs.url) {
			program
				.on('--help', function(){
				  console.log('  Bug reports, suggestions, updates:');
				  console.log('  ', pkg.bugs.url);
				});			
		}



	//});


}