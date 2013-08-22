/* commander/autocmdr component
 * This component initializes a new autocmdr/commader cli app using a template.
 */

 module.exports = function (program) {
	var path = require('path');
	var cp = require('child_process');
	var async = require('async');
	var spawn = require('win-spawn');

	var prompt = require('../lib/prompt')(program);
	var render = require('../lib/render')(program);

	program
		.command('init [name]')
		.option('-P, --no-prompt', "don\'t prompt for additional input")
		.option('--ver [version]', "version number")
		.option('--desc [description]', "description")
		.option('--author [author]', "author")
		.option('--license [license]', "license")
		.option('-l, --link', 'Link to autocmdr instead of installing')
		// TODO: option to change template
		// TODO: optional list of commands to pregenerate
		// TODO: prompt override
		// TODO: Dry-run?
		// TODO: Enable/disable plugins
		.version('0.0.0')
		.description('Create a new CLI application.')
		.action(function(name, opts){
			opts = opts || {};
			opts.output = opts.output || process.cwd();
			opts.name = name || path.basename(opts.output);
			opts.name = opts.name.replace('.js', '');
			opts.template = opts.template || path.join(__dirname, '../template/');
			opts.author = opts.author || program.config.get('author') || '';
			opts.link = opts.link || false;

			program.log.log('info', 'Initializing ',opts.name.bold.blue);

			ctx = {
				name: opts.name,
				version: opts.ver || '0.0.0',
				description: opts.desc || 'A autocmdr CLI app',
				author: opts.author,
				license:  opts.license || 'MIT'
			};

			async
				.series([
					_prompt,
					_writeBin,
					_writePackage,
					_getUsage,
					_writeReadme,
					_writeTests,
					_linkAutocmdr
			]);

			// Async functions
			function _prompt(done) {
				if (!opts.prompt) {
					done(null);
					return;
				}

				var properties = {
					name: {
						pattern: /^[a-zA-Z0-9\s\-]+$/,
						message: 'Name must be only letters, spaces, or dashes',
						default: ctx.name,
						required: true
					},
					version: { default: ctx.version },  // TODO: validate
					description: { default: ctx.description },
					author: { default: ctx.author },
					license: { default: ctx.license },
					continue: {
						message: 'Is this ok?',
						validator: /y[es]*|n[o]?/,
						warning: 'Must respond yes or no',
						default: 'yes'
					}
					//TODO: prompt to link or install?
				};

				prompt.start();

				prompt.get({ properties: properties }, function (err, result) {
					if (err && err.message == 'canceled' || result && result.continue != "yes") {
						program.log.warn('Initialization skipped');
						done('canceled');
					} else {
						ctx = result;
						done(null);
					}
				});
			}

			
			function _writeBin(done) {
				var bin = path.join(opts.output, 'bin/', ctx.name);

				program.log.info('Adding', ('bin/'+ctx.name).bold.blue);
				render(
					path.join(opts.template,'/bin/cmdrexec.eco'),
					bin,
					ctx,
					done
				);
			}

			function _getUsage(done) {
				var bin = path.join(opts.output, 'bin/', ctx.name);

				cp.exec('node '+bin+' --help',
					function (error, stdout, stderr) {

					if (stdout && error === null) {
						ctx.usage = stdout;
					} else {
						ctx.usage = '.bin/'+opts.name+' --help';
					}

					done(null);

				});
			}

			function _writeTests(done) {
				program.log.info('Adding','tests/'.bold.blue);
				render(
					path.join(opts.template,'/test/test.js.eco'),
					path.join(opts.output, 'test/', ctx.name+'.js'),
					ctx,
					done
				);
			}

			function _writeReadme(done) {
				program.log.info('Adding', 'Readme.md'.bold.blue);
				render(
					path.join(opts.template,'Readme.md.eco'),
					path.join(opts.output, 'Readme.md'),
					ctx,
					done
				);
			}

			function _writePackage(done) {
				program.log.info('Adding','package.json'.bold.blue);
				render(
					path.join(opts.template,'package.json.eco'),
					path.join(opts.output, 'package.json'),
					ctx,
					done
				);
			}

			function _linkAutocmdr(done) {  // TODO: Do this when all done
				program.log.info('All done.  Now trying to run npm to install or link to autocmdr.  Run ' + 'npm install'.bold.yellow + ' if it fails.');

				var args = (opts.link) ? ['link','autocmdr'] : ['install'];
				spawn('npm', args, { stdio: 'inherit' });
				done(null);

			}
			
		});

};