/* commander/autocmdr component
 * This component uses eco to render template files.
 * To use add require('autocmdr/lib/render.js')(program) . 
 * 
 */

module.exports = function (program) {

	var fs = require('fs');
	var eco = require('eco');
	var path = require('path');

	function _render(src, dst, context, done) {
		if (!src || !dst) {
			done('err');
			return;
		}

		context = context || {};
		done = done || function() {};

		program.log.debug('Eco\'ing file ' + src + ' to ' + dst);

		context = context || {};

		var reader = fs.readFileSync(src, "utf-8");
		reader = eco.render(reader, context);

		var dstdir = path.dirname(dst);

		if (!fs.existsSync(dstdir)) {
			fs.mkdirSync(dstdir);
		}

		fs.writeFile(dst, reader, function(err) {
			if(err) {
				program.log.error(err);
			} else {
				program.log.debug(dst+" was saved!");
			}
			done(err);
		});
	}

	return _render;

};

