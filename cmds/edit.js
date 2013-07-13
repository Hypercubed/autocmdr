module.exports = function (program) {
	var editor = require('editor');
	var path = require('path');

	program
		.command('edit <cmd>')
		.version('0.0.0')
		.description('Edit command file.')
		.action(function(cmdfile){
			// export VISUAL=`cygpath -w "/cygdrive/c/Program Files/Sublime Text 2/sublime_text.exe"`

			if (!cmdfile.match('.js'))
				cmdfile += '.js';

			var file = path.join(process.cwd(), 'cmds/', cmdfile);  // Handle paths, edit command wherever it is.

			//console.log(process.env);

			editor(file, function (code, sig) {
			    //console.log('finished editing with code ' + code);
			});

		});
	
};