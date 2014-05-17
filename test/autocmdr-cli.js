
var assert = require("assert");
var path = require('path');
var exec = require('child_process').exec;

var nixt = require('nixt');

describe('autocmdr bin', function(){

  var cmd = 'node '+path.join(process.cwd(), './bin/autocmdr')+' ';
  var _cmd = [path.join(__dirname, '../bin/autocmdr'), ''];

  if (process.platform === 'win32') {
    _cmd.unshift('"' + process.execPath + '"');
  }

  cmd = _cmd.join(' ');

  function cli() {
    return nixt({colors: false})
      .timeout(8000)
      .base(cmd);
  }

  it('--help should run without errors', function(done) {
    cli()
        .run('--help')
        //.stdout(/Usage: autocmdr/)
        .stderr('')
        .code(0)
        .end(done);
  });

  it('--version should run without errors', function(done) {
    cli()
        .run('--version')
        //.stdout(/[0-9].[0-9].[0-9]/)
        .stderr('')
        .code(0)
        .end(done);
  });

  it('completion should run without errors', function(done) {
    cli()
        .run('completion')
        .stdout(/###-begin-autocmdr-completion-###/)
        .stdout(/_autocmdr_completion/)
        .stderr('')
        .code(0)
        .end(done);
  });

  it('config should run without errors', function(done) {
    cli()
      .run('config')
      .stderr('')
      .code(0)
      .end(done);
  });

  it('should return error on unknown command', function(done) {
    cli()
      .run('addd')
      //.stderr(/autocmdr --help/)
      .code(1)
      .end(done);
  });

  it('should return error on missing command', function(done) {

    cli()
      .run('')
      //.stderr(/No command specified/)
      .code(1)
      .end(done);

  });

});
