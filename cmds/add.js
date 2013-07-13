var path = 	require('path');

module.exports = function (program) {

	program
		.command('add <cmdfile>')
		.usage('<cmdfile>')
		.description('Create a blank cmdfile.')
		.action(function(cmdfile){
			cmdfile = cmdfile || 'cmdfile';
			var name = cmdfile.replace('.js', '');

			if (!cmdfile.match('.js'))
				cmdfile += '.js';

			program.logger.log('info', 'Initilizing '+name);
			

			var src = path.join(__dirname, '../templates/cmdfile.js.eco');
			var dst = path.join(process.cwd(), 'cmds/', cmdfile);
			var ctx = { name: name, version: '0.0.0', action: '// Your code goes here' };

			// TODO: Check if file already exists

			//program.parseArgs(['cp', src, dst]);
			// TODO: Check if copy executed

			program.parse([process.argv[0], process.argv[1], 'eco', src, '-c', ctx, '-o', dst]);
			//program.parseArgs(['eco', src, ctx, '-o', dst]);

		});

};