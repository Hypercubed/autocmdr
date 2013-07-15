module.exports = function (program) {

	var path = require('path');
	var pkg = require(path.join(process.mainModule.filename, '../../package.json'));
	
	program._name = pkg.name;

	program
		.version(pkg.version)
		.description(pkg.description);

	program
		.on('--help', function(){
		  console.log('  Bug reports, suggestions, updates:');
		  console.log('  ', pkg.bugs.url);
		});

}