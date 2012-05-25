var mysql = require('mysql');

require('../utils/utils.js');

function select(params){
	var query = '',
		idx, 
		length,
		fields = '';

	if(params === undefined){
		throw {
			name: 'NullArguments',
			message: 'No parameters for the query were passed'
		};
	}

	if(params.from === undefined || params.from.isEmpty()){
		throw {
			name: 'BadArguments',
			message: 'You need to pass the name of the table to select from' 
		}
	}

	if(params.fields === undefined || !Array.isArray(params.fields) || params.fields.length === 0){
		params.fields = ['*']; //Default behavior, select all
	}

	for(idx = 0, length = params.fields.length; idx < length; idx += 1){
		fields += params.fields[idx];
		fields += (idx + 1) === length ? '' : ',';
	}

	query = select.template.format(fields, params.from);
	this.statements.push(query);

	return this;
}
select.template = 'SELECT {0} FROM {1}';

/*
*	@this an SqlQuery object
*/
function where(params){
	var query = [' WHERE'],
		idx,
		length,
		props = [],
		template = '',
		operand = 'AND';

	if(params === undefined){
		throw {
			name: 'BadArguments',
			message: 'No parameters were passed to create a WHERE statement'
		};
	}

	if(params.predicate && !params.predicate.isEmpty()){
		query.push(params.predicate);
		this.statements.push(query.join(' '));
		return this;
	}

	if(params.operand !== undefined){
		operand = params.operand;
		delete params.operand;
	}

	if(typeof(params) === 'object'){
		props = params.allProperties();

		for(idx = 0, length = props.length; 
			idx < length;
			idx += 1){

			//TODO: Refactor this to a function to able to handle
			//all kind of JS types and operands
			if(typeof(params[props[idx]]) === 'string'){
				template = "{0} = '{1}'";
			} else { 
				template = '{0} = {1}';
			}

			query.push(template.format(props[idx], params[props[idx]]));
			if((idx + 1) < length){
				query.push(operand);
			}
		}

		this.statements.push(query.join(' '));
	}

	return this;
}

function SqlQuery(client){
	var self,
		statements = [];

	if(!(this instanceof SqlQuery)){
		return new SqlQuery();
	}

	//Setup
	self = this;
	self.statements = [];

	//Entry Point
	self.select = function(params) {
		select.call(self, params);
		return self;
	}; 

	self.where = function (params) {
		where.call(self, params);
		return self;
	};

	//Exit Point
	self.go = function(callback){
		var query = '',
			idx,
			length = self.statements.length;

		for(idx = 0; idx < length; idx += 1){
			query += self.statements[idx] + ' ';
		}

		client.query(query, callback);
	}
}

/*	@description Hub to create consults to a db.
*	@constructor */
function DbClient(dbSetup){
	var self,
		sqlClient;

	if(!(this instanceof DbClient)){
		return new DbClient(dbSetup);
	}

	//Setup client
	self = this;
	//TODO: Lots of checks on that dbSetup object
	sqlClient = mysql.createClient(dbSetup);

	/*self.select = select;
	self.where 	= where; */

	self.doQuery = new SqlQuery(sqlClient);

	self.closeAll = function(){
		sqlClient.end();
	}

	return self;
}

exports.DbClient = DbClient;