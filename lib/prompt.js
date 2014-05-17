/* commander/autocmdr component
 * This component uses eco to render template files.
 * To use add require('autocmdr/lib/prompt.js')(program) .
 *
 */

module.exports = function (program) {
  'use strict';

  var prompt = require('prompt');

  prompt.message = program._name.green;

  return prompt;

};
