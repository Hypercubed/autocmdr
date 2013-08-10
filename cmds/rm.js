module.exports = function (program) {

	program
		.command('rm <cmdfile>')
		.version('0.0.0')
		.description('Delete a command.')
		.action(function(cmdfile){
			var fs = require('fs');
			var path = require('path');

			if (!cmdfile.match('.js'))
				cmdfile += '.js';

			// Your code goes here
			var file = path.join(process.cwd(), 'cmds/', cmdfile);  // Handle paths, edit command wherever it is.

			fs.unlinkSync(file)
			logger.log('info', 'Successfully deleted '+cmdfile);
		});
	
};