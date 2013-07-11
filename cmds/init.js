module.exports = function (program) {

	program
		.command('init <name>')
		.version('0.0.0')
		.description('Create a new autocmdr application here.')
		.action(function(cmdfile){
			// Your code goes here
			logger.log('warn', 'Not yet implemented');

			//  Eco ./bin/name.js
			//  Eco ./Readme.md
			//  mkdir cmds?
			//  npm init
			//  npm install autocmdr??
			//  npm install
			//  npm link .
		});
	
};