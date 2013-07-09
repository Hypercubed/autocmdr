module.exports = function (program) {

	program
		.command('newcmdr <name>')
		.version('0.0.0')
		.description('Create a new autocmdr application here.')
		.action(function(cmdfile){
			// Your code goes here
			logger.log('warn', 'Not yet implemented');

			//  Copy/eco ./bin/name.js
			//  mkdir cmds
			//  npm init
			//  npm install autocmdr??
			//  npm install
			//  npm link
		});
	
};