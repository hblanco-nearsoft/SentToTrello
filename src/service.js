var config 	= require('./config/config.js').config,
	datalogic = require('./data.logic'),
	candidate = null,
	dbClient,
	results;

//console.log(datalogic);
/*candidate = new entities.Candidate({name: { first: 'Hugo', last: 'Blanco'}, position: '.NET Developer'});
console.log(candidate.title());
*/

dbClient = new datalogic.Client(config.db);
dbClient.doQuery
		.select({fields: ['id_user', 'name', 'last_name'], from: 'users'})
		.where({ name: 'Hugo', last_name: 'Martinez', operand: 'OR'})
		.go(function resultsCallback(err, results, fields){
			if(err){
				console.error(err);
			}else{
				console.log(results);
				console.log('No. Of Results: ', results.length);
			}
			dbClient.closeAll();
		});


