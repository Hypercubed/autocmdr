/* commander/autocmdr component
 * This component initializes a new autocmdr/commader cli app using a template.
 */

 module.exports = function (program) {
	var path = require('path');
	var fs = require('fs');
	var cp = require('child_process');
	var async = require('async');
	var spawn = require('win-spawn');

	var xtend = require('xtend');

	var prompt = require('../lib/prompt')(program);
	var render = require('../lib/render')(program);

	program
		.command('init [name] [commands... ]')
		.option('-P, --no-prompt', "don\'t prompt for additional input")
		//.option('--ver [version]', "version number")
		//.option('--desc [description]', "description")
		//.option('--author [author]', "author")
		//.option('--license [license]', "license")
		.option('-l, --link', 'Link to autocmdr instead of installing')
		// TODO: option to change template
		// TODO: optional list of commands to pregenerate
		// TODO: prompt override
		// TODO: Dry-run?
		// TODO: Enable/disable plugins
		.version('0.0.0')
		.description('Create a new CLI application.')
		.action(function(name, cmds, opts){

			var defaults ={
				output: process.cwd(),
				name: path.basename(process.cwd()),
				template: path.join(__dirname, '../template/'),
				link: false
			};

			opts = xtend(defaults, opts || {});
			cmds = cmds || '';

			program.log.info('Initializing ',opts.name.bold.blue);

			var ctx = {
				name: opts.name,
				version: '0.0.0',
				description: 'A autocmdr CLI app',
				author: program.config.get('author') || '',
				license:  opts.license || 'MIT',
				yesno: 'no'
			};

			async.series([
				_prompt,
				_overWritePrompt,
				_writeBin,
				_writePackage,
				_getUsage,
				_writeReadme,
				_writeTests,
				_linkAutocmdr
			], function(err,result) {
				if (err) {
					program.log.error(err);
					process.exit(1);
				}


				if (cmds)
					cmds.split(',').forEach(function(name) {
						program.parse(['','','add',name,'-E','-P']);
					});

			});

			return;

			// Async functions
			function _prompt(done) {
				if (!opts.prompt) {
					prompt.override = ctx;
					return done(null);
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
					console.log('\n');

					if (err && err.message == 'canceled' || result && result.continue != "yes")
						return done('Initialization skipped');

					ctx = result;
					return done(err);

				});
			}

			// Async functions
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
				var bin = path.join(opts.output, './bin/', ctx.name);

				cp.exec('node '+bin+' --help', function (error, stdout, stderr) {

					ctx.usage = (error === null) ? stdout : 'node ./bin/'+opts.name+' --help';
					return done(null);

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

			function _overWritePrompt(done) {
				var dst = path.join(opts.output, 'package.json');

				fs.exists(dst, function (exists) {
					if (!exists) return done(null);

					program.log.warn('package.json'.green,'already exists');

					var yesno = { name: 'yesno',
						message: 'Overwrite?',
						validator: /y[es]*|n[o]?/,
						warning: 'Must respond yes or no',
						default: 'no'
					};

					prompt.get( yesno , function (err, val) {  // TODO: Prompt to overwrite
						if (val.yesno != "yes" && val.yesno != "y")
							return done('Initialization skipped');

						return done(null);
					});

				});
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
				var npm = spawn('npm', args, { stdio: 'inherit' });
				npm.on('close', function (code) {
					return done(null);
				});

			}

		});

};
