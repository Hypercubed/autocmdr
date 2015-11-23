/* commander/autocmdr component
 * This component uses eco to render template files.
 * To use add require('autocmdr/lib/prompt.js')(program) .
 *
 */
var prompt = require('prompt');

module.exports = function (program) {
  'use strict';

  prompt.message = program._name.green;

  return prompt;
};
