/* commander/autocmdr component
 * This component adds an autocmdr/commander command component from the cmds/ directory.
 */


// TODO: Clean this up!!

module.exports = function (program) {
	var editor = require('editor');
	var path = require('path');
	var fs = require('fs');

	var prompt = require('../lib/prompt')(program);
	var render = require('../lib/render')(program);

	program
		.command('add [name]')
		.usage('[name]')
		.option('-E, --no-editor', "don\'t open new command file in editor")
		//.option('--editor <editor>', "Specify editor to use")
		.option('-P, --no-prompt', "don\'t prompt for additional input")
		.option('--desc [description]', "description")
		.description('Create a command file.')
		.action(function(name, opts){
			opts = opts || {};
			opts.name = name || 'name';
			opts.name = opts.name.replace('.js', '');
			opts.editor = opts.editor === false ? false : program.config.get('editor') !== 'false';
			opts.template = opts.template || path.join(__dirname, '../template/');
			opts.output = opts.output || process.cwd();

			var ctx = {
				name: opts.name,
				description: opts.desc || ' ',
				version: '0.0.0',
				yesno: 'no'
			};

			var properties = {
				name: {
					pattern: /^[a-zA-Z0-9\s\-]+$/,
					message: 'Name must be only letters, numbers, spaces, or dashes',
					default: ctx.name,
					required: true
				},
				description: { default: ctx.description },
				version: { default: ctx.version }  // TODO: validate
			};

			if (!opts.prompt)
				prompt.override = ctx;

			prompt.start();

			prompt.get({ properties: properties }, function (err, ctx) {
				if (err && err.message == 'canceled') {
					console.log('\n');
					program.log.warn('Command initialization skipped');
					return;
				}

				ctx.name = ctx.name.replace('.js', '');
				ctx.file = 'cmds/'+ctx.name+'.js';

				var src = path.join(opts.template, '/cmds/cmdrfile.js.eco');
				var dst = path.join(opts.output, ctx.file);

				fs.exists(dst, function (exists) {

					if (exists) {
						program.log.warn('Command',ctx.name.green,'already exists at',dst.blue);

						var yesno = { name: 'yesno',
							message: 'Overwrite?',
							validator: /y[es]*|n[o]?/,
							warning: 'Must respond yes or no',
							default: 'no'
						};

						prompt.get( yesno , function (err, val) {  // TODO: Prompt to overwrite
							if (val.yesno == "yes" || val.yesno == "y") {
								_write();
							} else {
								program.log.warn('Command initialization skipped');
							}
						});

					} else {
						_write();
					}

					function _write() {
						program.log.info('Initializing command',ctx.name.green,'at',dst.blue);
						render(src, dst, ctx);
						_edit();
					}

					function _edit() {
						if (opts.editor) {
							program.log.info('Opening',ctx.name.green,'in editor');

							if (opts.editor === true && program.config.get('editor')) {
								_opts = { editor: program.config.get('editor') };
							} else {
								_opts = {};
							}

							editor(dst, _opts, function (code, sig) {  // TODO: Catch error
								program.log.debug('finished editing with code ' + code);
							});
						}
					}
					
				});

			});

		});

};