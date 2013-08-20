/**
 * This is a autocmdr command/plugin file
 *
 * It exports a single initialization function. 
 *
 */

 module.exports = function (program) {
	var path = require('path');
	var prompt = require('prompt');
	var exec = require('child_process').exec;

	program
		.command('init [name]')
		// TODO: option to change template
		// TODO: option to skip prompting
		// TODO: optional list of commands to pregenerate
		// TODO: prompt override
		// TODO: Dry-run?
		// TODO: Enable/disable plugins
		.version('0.0.0')
		.description('Create a new autocmdr application here.')
		.action(function(name, opts){
			opts = opts || {};
			opts.output = opts.output || process.cwd();
			opts.name = name || path.basename(opts.output);
			opts.name = opts.name.replace('.js', '');
			opts.template = opts.template || path.join(__dirname, '../template/');
			opts.author = opts.author || program.config.get('author') || '';

			program.logger.log('info', 'Initializing '+opts.name);
			program.logger.warn('Not yet full implemented');
			
			// TODO: read existing package.json
			var properties = {
		      name: {
			        pattern: /^[a-zA-Z0-9\s\-]+$/,
			        message: 'Name must be only letters, spaces, or dashes',
			        default: opts.name,
			        required: true
			      },
		      version: { default: '0.0.0' },  // TODO: validate
		      description: { default: 'A autocmdr CLI app' },
		      author: { default: opts.author },
		      license: { default: 'MIT' },
		      continue: {
				  message: 'Is this ok?',
				  validator: /y[es]*|n[o]?/,
				  warning: 'Must respond yes or no',
				  default: 'yes'
				}
		    };

			// ['name', 'version', 'description', 'author', 'license']
			prompt.get({ properties: properties }, function (err, ctx) {

				if (err && err.message == 'canceled' || ctx && ctx.continue != "yes") {
					console.log('\n');
	            	program.logger.warn('Initialization skipped');
	            } else {
	            	var bin = path.join(opts.output, 'bin/', ctx.name);

					// Make the bin/name file. TODO: Make this safe
					program.logger.info('Adding bin/'+ctx.name);
					program.eco(
						path.join(opts.template,'/bin/cmdrexec.eco'), 
						bin, 
						ctx
					);

					// Make the package.json. TODO: Make this safe
					program.logger.info('Adding package.json');
					program.eco(
						path.join(opts.template,'package.json.eco'), 
						path.join(opts.output, 'package.json'),
						ctx
					);

					exec('node '+bin+' --help',
					  function (error, stdout, stderr) {

					    if (stdout && error == null) {
					      ctx.usage = stdout;
					    } else {
					    	ctx.usage = '.bin/'+opts.name+' --help';
					    }

						program.logger.info('Adding Readme.md');
						program.eco(
							path.join(opts.template,'Readme.md.eco'), 
							path.join(opts.output, 'Readme.md'),
							ctx
						);

					});

					program.logger.info('Adding tests');
					program.eco(
						path.join(opts.template,'/test/test.js.eco'), 
						path.join(opts.output, 'test/', ctx.name+'.js'),
						ctx
					);

					program.logger.info('Run npm install');
				}

			});

			//  - [x] Eco ./bin/name.js
			//  - [ ] Eco ./Readme.md
			//  - [ ] mkdir cmds?
			//  - [-] npm init
			//  - [-] npm install --save autocmdr?
			//  - [-] add bin to package.json
			//  - [ ] npm link autocmdr
			
		});
	
};