module.exports = function (program) {

	program
		.command('<%= @name %>')
		.version('<%= @version %>')
		.description('<%= @description %>')
		.action(function(cmdfile){
			<%= @action %>
		});
	
};