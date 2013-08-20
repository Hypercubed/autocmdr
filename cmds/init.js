/**
 * This is a autocmdr command/plugin file
 *
 * It exports a single initialization function. 
 *
 */

 module.exports = function (program) {
	var path = require('path');
	var prompt = require('prompt');

	program
		.command('init <name>')
		// TODO: option to change template
		// TODO: option to disable prompting
		// TODO: prompt override
		.version('0.0.0')
		.description('Create a new autocmdr application here.')
		.action(function(cmdrfile){
			cmdrfile = cmdrfile || 'cmdfile';
			var name = cmdrfile.replace('.js', '');

			program.logger.log('info', 'Initializing '+name);
			program.logger.warn('Not yet full implemented');

			var templateDir = path.join(__dirname, '../templates/');
			var outDir = process.cwd();
			
			// TODO: read existing package.json
			var properties = {
		      name: {
			        pattern: /^[a-zA-Z\s\-]+$/,
			        message: 'Name must be only letters, spaces, or dashes',
			        default: name,
			        required: true
			      },
		      version: { default: '0.0.0' },  // TODO: validate
		      description: { default: 'A autocmdr CLI app' },
		      author: { default: program.config.get('author') || '' },
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
				console.log(ctx);

				if (ctx.continue == "yes") {
					// Make the bin/name file. TODO: Make this safe
					program.logger.info('Adding bin/'+name);
					program.eco(templateDir+'cmdr.js.eco', path.join(outDir, 'bin/', cmdrfile), ctx);

					// Make the package.json. TODO: Make this safe
					program.logger.info('Adding package.json');
					program.eco(templateDir+'package.json.eco', path.join(outDir, 'package.json'), ctx);

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