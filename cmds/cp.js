var path = 	require('path');
var fs = 	require('fs');

module.exports = function (program) {

	program
		.command('cp <src> <dst>')
		.version('0.0.0')
		.description('Copies src file to dst.')
		.action(function(src, dst){

			console.log('Copying file ' + src + ' to ' + dst);

			cpFileWithRender(src, dst);
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