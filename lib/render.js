/* commander/autocmdr component
 * This component uses eco to render template files.
 * To use add require('autocmdr/lib/render.js')(program) . 
 * 
 */

module.exports = function (program) {

	var fs = require('fs');
	var eco = require('eco');
	var path = require('path');
	var mkdirp = require("mkdirp");
	var async = require("async");

	function _render(src, dst, context, done) {
		done = done || function(err) {
			if (err)
				program.log.error(err);
		};

		if (!src || !dst)
			return done('err');

		context = context || {};
		
		program.log.debug('Eco\'ing file ' + src + ' to ' + dst);

		var data = "";

		async.auto({
			get_data: [
				function(cb){
					fs.readFile(src, "utf-8", cb);
				}],
			render_data: ['get_data',
				function(cb){
					data = eco.render(data, context);
					cb();
				}],
			make_folder: [
				function(done){
					mkdirp(path.dirname(dst), done);
				}],
			write_file: ['render_data', 'make_folder',
				function(callback){
					fs.writeFile(dst, data, done);
				}]
			}, done);


		/* fs.readFile(src, "utf-8", function (err, data) {
			if (err) return done(err);

			data = eco.render(data, context);

			mkdirp(path.dirname(dst), function (err) {
				if (err) return done(err);

				fs.writeFile(dst, data, done);

			});

		}); */

	}

	return _render;

};

