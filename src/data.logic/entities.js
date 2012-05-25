require('../utils/utils.js');

/*
*	@author Hugo Blanco Sandoval
*	@constructor
*	@description Constructor to create Candidates objects. */
function Candidate(values){
	var candidate = this,
		val;

	if(!(this instanceof Candidate)){
		return new Candidate(values);
	}

	candidate.name = {
		first: '',
		middle: '',
		last: '',
		secondLast : ''
	};

	candidate.position = '';
	candidate.members = []; //List of members for the Trello Card

	//Use the data in the values object
	for(prop in values){
		if(values.hasOwnProperty(prop)){
			candidate[prop] = values[prop];
		}
	}

	candidate.title = function(){l
		return '{0} {1} - {2}'.format(this.name.first, this.name.last, this.position);
	}

	return candidate;
}

exports.Candidate = Candidate;