/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GroupSchema = new mongoose.Schema({		
	groupname : String,
	members : [{
		name : String,
		email : String
	}],
	about : String,
	ins_on : Date
});

var Group = mongoose.model('group', GroupSchema);

module.exports = Group;