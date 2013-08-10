

module.exports = function (program) {
	var editor = require('editor');
	var path = 	require('path');
	var fs = require('fs');

	program
		.command('add <cmdfile>')
		.usage('<cmdfile>')
		// TODO: option to change template
		.description('Create a blank cmdfile.')
		.action(function(cmdfile){
			cmdfile = cmdfile || 'cmdfile';
			var name = cmdfile.replace('.js', '');

			if (!cmdfile.match('.js'))
				cmdfile += '.js';

			var src = path.join(__dirname, '../templates/cmdfile.js.eco');
			var dst = path.join(process.cwd(), 'cmds/', cmdfile);

			fs.exists(dst, function (exists) {

				if (exists) {
					program.logger.warn('Command ',name.green,'already exists at',dst);
				} else {
					program.logger.info('Initilizing command',name.green,'at',dst);

					var ctx = { name: name, version: '0.0.0', action: '// Your code goes here' };

					program.eco(src, dst, ctx);
				}

				editor(dst, function (code, sig) {
				    //console.log('finished editing with code ' + code);
				});	
					
			});

		});

};