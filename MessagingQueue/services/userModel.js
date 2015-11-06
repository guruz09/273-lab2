/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new mongoose.Schema({	
	_id: String,
	name: { 
		fname : String,
		lname : String
	},					
	email : String,
	pwd : String,
	dob : String,
	gender : String
});

var User = mongoose.model('users', UserSchema);

module.exports = User;