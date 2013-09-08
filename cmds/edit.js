/* commander/autocmdr component
 * This component opens the autocmdr/commander in your editor.
 */

'use strict';

module.exports = function (program) {
	var editor = require('editor');
	var path = require('path');
	var domain = require('domain');

	program
		.command('edit <name>')
		.version('0.0.0')
		.description('Edit a command file.')
		.option('-e, --editor <editor>', "Specify editor to use")
		.action(function(name, opts){
			opts = opts || {};
			opts.name = name;
			opts.name = opts.name.replace('.js', '');
			opts.editor = opts.editor || program.config.get('editor');

			var file = path.join(process.cwd(), 'cmds/', opts.name+'.js');

			program.log.info('Opening',file.green,'in editor');  // TODO: stat file, prompt to add on missing

			if (opts.editor !== false  && opts.editor !== "false") {
				_opts = { editor: opts.editor };
				program.log.debug('Launching',opts.editor);
			} else {
				_opts = {};
				program.log.debug('Launching default editor');
			}

			var d = domain.create();

			d.on('error', function(er) {  
			  if (er.code == 'ENOENT') {
			  	program.log.warn('Unable to launch default editor');
			  } else {
			  	console.error(err);
			  }
			});

			d.run(function() {  
				editor(file, _opts, function (code, sig) {
					//console.log(code, sig);
				});
			});

		});

};
