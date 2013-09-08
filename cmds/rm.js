/* commander/autocmdr component
 * This component removes a autocmdr/commander command component from the cmds/ directory.
 */

'use strict';

 module.exports = function (program) {

	program
		.command('rm <name>')
		.version('0.0.0')
		.description('Delete a command file.')
		.action(function(cmdfile){
			var fs = require('fs');
			var path = require('path');

			if (!cmdfile.match('.js'))
				cmdfile += '.js';

			// Your code goes here
			var file = path.join(process.cwd(), 'cmds/', cmdfile);  // Handle paths, edit command wherever it is.

			if (fs.existsSync(file)) {
				fs.unlinkSync(file);
				program.log.info('Successfully deleted ',cmdfile.green);
			} else {
				program.log.warn('Command',cmdfile.green,'not found');
				process.exit(1);
			}

		});

};
