// commander/autocmdr plugin

// Load with . <(execname completion)

module.exports = function (program, opts) {

	opts = opts || {};
	opts.name = opts.name || program._name || require('path').basename(process.mainModule.filename);

	program							// Needed to avoid unknown command trigger, should be hidden
	   .command('completion')
	   .description('')
	   .action(function(opts) {
			
	   });

	require('commander-tabtab').init(program, opts.name);

}

