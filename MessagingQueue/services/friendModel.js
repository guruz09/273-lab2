/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var friendschema = new mongoose.Schema({					
	email : String, 
	femail : String,
	status : String
});
		
var frnds = mongoose.model('friends', friendschema);
						

module.exports = frnds; 

