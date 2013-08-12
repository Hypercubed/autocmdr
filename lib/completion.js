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

	var tabtab = require('tabtab');

	// Based on https://github.com/bencevans/commander-tabtab.js, only minor changes.
	// Maybe make a fork?

	if(process.argv.slice(2)[0] === 'completion') return tabtab.complete(opts.name, function(err, data) {
		//console.log(data);

	    // simply return here if there's an error or data not provided.
	    // stderr not showing on completions
	    if(err || !data) return;

	    // Log all Generic Long Options
	    if(/^--\w?/.test(data.last)) return tabtab.log(program.options.map(function (data) {
	      return data.long;
	    }), data);

	    // Log all Generic Short Options
	    if(/^-\w?/.test(data.last)) return tabtab.log(program.options.map(function (data) {
	      return data.short;
	    }), data);

	    // Log all inital commands
	    tabtab.log(program.commands.map(function (data) {
	      return data._name;
	    }), data);

	});

}

