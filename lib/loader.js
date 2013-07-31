// commander/autocmdr plugin
// To use call `require('autocmdr/loader.js')(program)` where program is a commander or autocmdr Command;
//
// adds program.require and program.loadCmds for convince

module.exports = function (program) {
	// Node.js
	var path            = require('path');
	var fs              = require('fs');

	//require('./logger.js')(program);  

	program.require = function(filepath) {  // TODO: Prevent loading twice

	    if(typeof filepath == "string") {   // TODO: Don't load same command twice?
	    	program.logger.debug('Loading ',filepath);
			require(filepath)(program);	// This adds the command to this program
		}

	    return program;
	};

	// Load tasks in a given folder.
	program.loadCmds = function(dirpath) {

		if (fs.existsSync(dirpath) && fs.statSync(dirpath).isDirectory()) {
			program.logger.debug('Loading commands from '+dirpath);
			fs.readdirSync(dirpath).forEach(function(filename) {
				var filepath = path.join(dirpath,filename);
				program.require(filepath);
			});
	  	} else {
	  		logger.log('warn', 'Directory not found '+dirpath);
	  	}

	  	return program;
	}

	;

}