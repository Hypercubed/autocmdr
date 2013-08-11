

module.exports = function (program) {
	var editor = require('editor');
	var path = 	require('path');
	var fs = require('fs');

	program
		.command('add <cmdfile>')
		.usage('<cmdfile>')
		// TODO: option to change template
		.option('-N, --no-editor', "don\'t open new cmd file in editor")
		.description('Create a blank cmdfile.')
		.action(function(cmdfile, opts){

			cmdfile = cmdfile || 'cmdfile';
			var name = cmdfile.replace('.js', '');

			if (!cmdfile.match('.js'))
				cmdfile += '.js';

			var src = path.join(__dirname, '../templates/cmdfile.js.eco');
			var dst = path.join(process.cwd(), 'cmds/', cmdfile);

			fs.exists(dst, function (exists) {

				if (exists) {
					program.logger.warn('Command',name.green,'already exists at',dst.blue);
				} else {
					program.logger.info('Initializing command',name.green,'at',dst.blue);

					var ctx = { name: name, version: '0.0.0', action: '// Your code goes here' };

					program.eco(src, dst, ctx);
				}

				if (opts.editor) {
					editor(dst, function (code, sig) {
						program.logger.info('Opening',name.green,'in editor');
					    //console.log('finished editing with code ' + code);
					});						
				}
					
			});

		});

};