var fs = require('fs'),
	data;

data = fs.readFileSync('config/config.json');
exports.config = JSON.parse(data);