/* commander/autocmdr component
 * This component adds an autocmdr/commander command component from the cmds/ directory.
 */


// TODO: Clean this up!!  Use async.

module.exports = function (program) {
	var editor = require('editor');
	var path = require('path');
	var fs = require('fs');

	var prompt = require('../lib/prompt')(program);
	var render = require('../lib/render')(program);

	var async = require('async');

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

			async.series([
				_prompt,
				_overWritePrompt,
				_write,
				_edit
			]);

			function _prompt(done) {

				if (!opts.prompt) {
					prompt.override = ctx;
					done(null);
					return;
				}

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

				prompt.start();

				prompt.get({ properties: properties }, function (err, result) {
					if (err && err.message == 'canceled') {
						console.log('\n');
						program.log.warn('Command initialization skipped');
						done('Command initialization skipped');
						return;
					}

					ctx = result;
					done(null);

				});

			}

			function _overWritePrompt(done) {

				ctx.name = ctx.name.replace('.js', '');
				ctx.file = 'cmds/'+ctx.name+'.js';
				ctx.src = path.join(opts.template, '/cmds/cmdrfile.js.eco');
				ctx.dst = path.join(opts.output, ctx.file);

				fs.exists(ctx.dst, function (exists) {
					if (!exists) done(null);

					program.log.warn('Command',ctx.name.green,'already exists');

					var yesno = { name: 'yesno',
						message: 'Overwrite?',
						validator: /y[es]*|n[o]?/,
						warning: 'Must respond yes or no',
						default: 'no'
					};

					prompt.get( yesno , function (err, val) {  // TODO: Prompt to overwrite
						if (val.yesno != "yes" && val.yesno != "y") {
							program.log.warn('Command initialization skipped');
							done('Command initialization skipped');
						} else {
							done(null);
						}
					});

				});
			}

			function _write(done) {
				program.log.info('Initializing command',ctx.name.green);
				render(ctx.src, ctx.dst, ctx, done);
			}

			function _edit(done) {
				if (opts.editor) {
					program.log.info('Opening',ctx.name.green,'in editor');

					if (opts.editor === true && program.config.get('editor')) {
						_opts = { editor: program.config.get('editor') };
					} else {
						_opts = {};
					}

					editor(ctx.dst, _opts, function (code, sig) {  // TODO: Catch error
						program.log.debug('finished editing with code ' + code);
					});
				}
				done();
			}

		});

};