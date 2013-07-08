var path = 	require('path');

module.exports = function (program) {

	program
		.command('init [cmdfile]')
		.description('Create a blank cmdfile.')
		.action(function(cmdfile){
			console.log('Initilizing '+cmdfile);

			cmdfile = cmdfile || 'cmdfile.js';
			var name = cmdfile.replace('.js', '');

			var src = path.join(__dirname, '../base_cmdfile.js');
			var dst = path.join(process.cwd(), 'cmds/', cmdfile);

			// TODO: Check if file already exists

			//program.parseArgs(['cp', src, dst]);
			// TODO: Check if copy executed

			program.parseArgs(['eco', src, dst, { 'name': name } ]);

		});

};