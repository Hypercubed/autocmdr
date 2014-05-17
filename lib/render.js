/* commander/autocmdr component
 * This component uses eco to render template files.
 * To use add require('autocmdr/lib/render.js')(program) .
 *
 */

module.exports = function (program) {
  'use strict';

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
    async.series([
        function(cb){
          program.log.debug('Reading',src.blue);
          fs.readFile(src, "utf-8", function(err, _data) {
            program.log.debug('Render');
            data = eco.render(_data, context);
            return cb(null);
          });
        },
        function(cb){
          var dirname = path.dirname(dst);
          program.log.debug('Making path',dirname.blue);
          mkdirp(dirname, cb);
        },
        function(cb){
          program.log.debug('Writing',dst.blue);
          fs.writeFile(dst, data, cb);
        }], done);

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
