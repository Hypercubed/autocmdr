/* commander/autocmdr component
 * This component uses node-tabtab to add auto-completion support to your commander or autocmdr program.
 * To use add require('autocmdr/lib/completion.js')(program) just before program.parse(argv).
 *
 * You will then need to do one of the following to enable auto-completion in your shell.
 *
 * - Add completion helper to ~/.bashrc (or ~/.zshrc) pkgname completion >> ~/.bashrc
 * - Add completion to current shell . <(pkgname completion)
 */

module.exports = function (program, opts) {
  'use strict';

  opts = opts || {};
  opts.name = opts.name || program._name || require('path').basename(process.mainModule.filename);

  program             // Needed to avoid unknown command trigger, should be hidden
    .command('completion')
    .description('Print command completion script')
    .action(function(opts) {

    });

  require('commander-tabtab').init(program, opts.name);

};
