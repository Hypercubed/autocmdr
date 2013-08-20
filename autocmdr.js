// This the autocmdr file.  It is automatically loaded when autocmdr is called in this directory

var fs = 	require('fs');
var eco = 	require('eco');
var path = 	require('path');

module.exports = function (program) {

	program.eco = cpFileWithRender;  // This is not a plugin... maybe it should be

	function cpFileWithRender(src, dst, context) {
		program.logger.debug('Eco\'ing file ' + src + ' to ' + dst);

		context = context || {};

		var reader = fs.readFileSync(src, "utf-8");
		reader = eco.render(reader, context);

		var dstdir = path.dirname(dst);

		if (!fs.existsSync(dstdir)) {
			fs.mkdirSync(dstdir)
		}

		fs.writeFile(dst, reader, function(err) {
		    if(err) {
		        program.logger.error(err);
		    } else {
		        program.logger.info(dst+" was saved!");
		    }
		});
	}

};

