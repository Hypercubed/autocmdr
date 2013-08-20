/**
 * This is a autocmdr command/plugin file
 *
 * It exports a single initialization function. 
 *
 */

module.exports = function (program) {
	var editor = require('editor');
	var path = 	require('path');
	var fs = require('fs');
	var prompt = require('prompt');

	program
		.command('add [cmdfile]')
		.usage('[cmdfile]')
		.option('-E, --no-editor', "don\'t open new command file in editor")
		//.option('-P, --no-prompt', "don\'t prompt for input")
		// TODO: promot overide
		// TODO: disable prompting
		.description('Create a autocmdr command file.')
		.action(function(name, opts){
			name = name || 'cmdfile';
			name = name.replace('.js', '');

			var properties = {
		      name: {
			        pattern: /^[a-zA-Z0-9\s\-]+$/,
			        message: 'Name must be only letters, numbers, spaces, or dashes',
			        default: name,
			        required: true
			      },
			  description: { default: 'A autocmdr command file' },
		      version: { default: '0.0.0' }  // TODO: validate
		    };		

			var src = path.join(__dirname, '../templates/cmdfile.js.eco');

		    prompt.get({ properties: properties }, function (err, ctx) {
		    	ctx.name = ctx.name.replace('.js', '');
		    	ctx.file = 'cmds/'+ctx.name+'.js';

				var dst = path.join(process.cwd(), ctx.file);

				fs.exists(dst, function (exists) {

					if (exists) {  
						program.logger.warn('Command',name.green,'already exists at',dst.blue);

						var yesno = { name: 'yesno',
									  message: 'Overwrite?',
									  validator: /y[es]*|n[o]?/,
									  warning: 'Must respond yes or no',
									  default: 'no'
									};

						prompt.get( yesno , function (err, val) {  // TODO: Prompt to overwrite
							if (val.yesno == "yes" || val.yesno == "y") {
								_write()
							}
						});

					} else {
						_write();
					}

					function _write() {
						program.logger.info('Initializing command',name.green,'at',dst.blue);
						program.eco(src, dst, ctx);
						_edit();
					}

					function _edit() {
						if (opts.editor) {
							editor(dst, function (code, sig) {
								program.logger.info('Opening',name.green,'in editor');
							    //console.log('finished editing with code ' + code);
							});						
						}							
					}
					
						
				});

		    });

		});

};