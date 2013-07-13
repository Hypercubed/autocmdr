module.exports = function (program) {
	var path = require('path');

	program
		.command('init <name>')
		.version('0.0.0')
		.description('Create a new autocmdr application here.')
		.action(function(cmdrfile){
			cmdrfile = cmdrfile || 'cmdfile';
			var name = cmdrfile.replace('.js', '');

			logger.log('info', 'Initilizing '+name);

			var src = path.join(__dirname, '../templates/cmdr.js.eco');
			var dst = path.join(process.cwd(), 'bin/', cmdrfile);
			var ctx = { name: name, version: '0.0.0', usage: '[options] <cmd>' };

			// TODO: Check if file already exists

			//program.parseArgs(['cp', src, dst]);
			// TODO: Check if copy executed

			program.parse([process.argv[0], process.argv[1], 'eco', src, '-c', ctx, '-o', dst]);
			//program.parseArgs(['eco', src, ctx, '-o', dst]);


			// Your code goes here
			logger.log('warn', 'Not yet full implemented');

			//  Eco ./bin/name.js
			//  Eco ./Readme.md
			//  mkdir cmds?
			//  npm init
			//  npm install autocmdr??
			//  npm install
			//  npm link .
		});
	
};