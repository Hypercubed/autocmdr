/* commander/autocmdr component
 * This component opens the autocmdr/commander in your editor.
 */

module.exports = function (program) {
	var editor = require('editor');
	var path = require('path');

	program
		.command('edit <name>')
		.version('0.0.0')
		.description('Edit a command file.')
		.option('--editor <editor>', "Specify editor to use")
		.action(function(name, opts){
			opts = opts || {};
			opts.name = name;
			opts.name = opts.name.replace('.js', '');
			opts.editor = opts.editor || program.config.get('editor');

			var file = path.join(process.cwd(), 'cmds/', opts.name+'.js');

			program.log.info('Opening',file.green,'in editor');

			if (opts.editor !== false  && opts.editor !== "false") {
				_opts = { editor: opts.editor };
				program.log.debug('Launching',opts.editor);
			} else {
				_opts = {};
				program.log.debug('Launching default editor');
			}

			editor(file, _opts, function (code, sig) {
				program.log.debug('finished editing with code ' + code);
			});

		});
	
};