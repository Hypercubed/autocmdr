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

		async.auto({
			read: [
				function(cb){
					fs.readFile(src, "utf-8", cb);
				}],
			render: ['read',
				function(cb, data){
					var render = eco.render(data.read, context);
					cb(null, render);
				}],
			folder: [
				function(cb){
					mkdirp(path.dirname(dst), cb);
				}],
			write: ['render', 'folder',
				function(cb, data){
					fs.writeFile(dst, data.render, cb);
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

