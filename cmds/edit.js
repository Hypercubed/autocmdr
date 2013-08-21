/* commander/autocmdr component
 * This component edits an autocmdr/commander command component from the cmds/ directory.
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

			program.logger.info('Opening',file.green,'in editor');

			if (opts.editor !== false  && opts.editor !== "false") {
				_opts = { editor: opts.editor };
				program.logger.debug('Launching',opts.editor);
			} else {
				_opts = {};
				program.logger.debug('Launching default editor');
			}

			editor(file, _opts, function (code, sig) {
				program.logger.debug('finished editing with code ' + code);
			});

		});
	
};