var mysql 	= require('mysql'),
	config 	= require('config/config.js'),
	client 	= '';

require('../utils/utils.js');

client = mysql.createClient(config.db);
exports.db = {
	get: {
		user: function(by){
			return {
				msg: 'This is a test object';
			};
		}
	}
}