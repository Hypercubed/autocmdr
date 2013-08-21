/**
 * This is a autocmdr command/plugin file
 *
 * It exports a single initialization function. 
 *
 */

module.exports = function(program) {

	program
		.command('mycmd')
		.version('0.0.0')
		.description(' ')
		.action(function(){
			// Your code goes here
		});
	
};