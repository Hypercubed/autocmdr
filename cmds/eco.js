var fs = 	require('fs');
var eco = require('eco');

module.exports = function (program) {

	program
		.command('eco <src> <dst> <context>')
		.version('0.0.0')
		.description('Render a file using eco')
		.action(function(src, dst, context){
			if (typeof dst == "object") {
				context = dst;
				dst = src;
			} else {
				context = context || {};
			}

			console.log('Eco\'ing file ' + src + ' to ' + dst);

			cpFileWithRender(src, dst, eco.render, context);

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
	        console.log(err);
	    } else {
	        console.log("The file was saved!");
	    }
	});
}
