module.exports = function (program) {

	program
		.command('*')
		.version('0.0.0')
		.description('Envoked when unknown command is given')
		.action(function(name){
			// Your code goes here
			logger.log('warn', '\''+name+'\' is not a known command. See \''+program._name+' --help\'.');
		});
	
};