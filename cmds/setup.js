module.exports = function (program) {
	var path			= require('path');
	var pkg = require(path.join(__dirname, '../package.json'));
	
	program
	    .version(pkg.version)
	    .usage('[options] <cmd>')
	    .option('-d, --debug', "enable debugger")
	    .option('-g, --global', "use global autocmdr tasks");
	
};