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
		.description('A autocmdr command file')
		.action(function(){
			// Your code goes here
		});
	
};