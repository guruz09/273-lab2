/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = new mongoose.Schema({		
	name : String,
	email : String,
	post : String,
	ins_on : Date
});

var Post = mongoose.model('posts', PostSchema);

module.exports = Post;