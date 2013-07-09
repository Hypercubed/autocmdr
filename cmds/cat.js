module.exports = function (program) {

	program
		.command('cat <cmd>')
		.version('0.0.0')
		.description('List command source')
		.action(function(cmdfile){
			var fs = require('fs');
			var path = require('path');


			// Your code goes here
			var file = path.join(process.cwd(), 'cmds/', cmdfile);  // Handle paths, edit command wherever it is.
			var source = fs.createReadStream(file);
			var dest = process.stdout;

			source.pipe(dest);
			//dest.write('\n');
		});
	
};
