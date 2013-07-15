module.exports = function (program) {
	// Node.js
	var path            = require('path');
	var fs              = require('fs');

	program.addCmd = function (cmd) {

	    if(typeof cmd == "function") {   // TODO: Don't load same command twice?
			cmd(program);	// This adds the command to this program
		}

	    return program;
	};

	// Load tasks in a given folder.
	program.loadCmds = function(dirpath) {

		if (fs.existsSync(dirpath) && fs.statSync(dirpath).isDirectory()) {
			logger.log('debug', 'Loading commands from '+dirpath);
			fs.readdirSync(dirpath).forEach(function(filename) {
				var filepath = path.join(dirpath,filename);
				program.addCmd(require(filepath));
			});
	  	} else {
	  		logger.log('warn', 'Directory not found '+dirpath);
	  	}

	  	return program;
	}

}