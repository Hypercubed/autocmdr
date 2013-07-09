var fs = 	require('fs');
var eco = 	require('eco');

module.exports = function (program) {

	program
		.command('eco <src>')
		.version('0.0.0')
		.description('Render a file using eco')
		.option('-o, --output [filename]', 'testing flagging in command')
		.option('-c, --context [context]', 'context to pass to eco')
		.action(function(src, options){
			//  TODO: Get context from file

			var dst = options.output || src;
			var ctx = options.context || {};

			logger.log('info', 'Eco\'ing file ' + src + ' to ' + dst);

			cpFileWithRender(src, dst, eco.render, ctx);

		});
	
};

// Move this to seperate cmdfile
function cpFileWithRender(src, dst, renderer, context) {
	context = context || {};

	var reader = fs.readFileSync(src, "utf-8");

	if (renderer) {
		var reader = renderer(reader, context);
	}

	fs.writeFile(dst, reader, function(err) {
	    if(err) {
	        logger.log('error', err);
	    } else {
	        logger.log('info', "The file was saved!");
	    }
	});
}
