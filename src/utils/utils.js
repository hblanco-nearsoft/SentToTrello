String.prototype.format = function (){
	var values = [].slice.call(arguments, 0, arguments.length),
    	idx, 
    	length = values.length,
    	regex, 
    	str = this;
	
	if(str.match(/\{\d+\}/g).length !== length){
		throw{
			name: 'ArgumentMissMatch',
			message: 'The numbers of placeholders and values are not the same'
		};
	}

    for(idx = 0; idx < length; idx += 1){
        regex = new RegExp(['\\\{', idx, '\\\}'].join(''), 'ig');
        str = str.replace(regex, values[idx]);
    }

    return str;
};

String.prototype.isEmpty = function(){
    if(typeof this !== 'string') {
        if(typeof this === 'object' && !(this instanceof String)){
            throw {
                name: 'InvalidType',
                message: 'The current type is not a String'
            }
        }
    }
    return this.length === 0;
};

Object.prototype.allProperties = function() {
    var prop,
        props = [];
        
    for(prop in this){
        if(this.hasOwnProperty(prop)){
            props.push(prop);
        }
    }

    return props;
};