/**
 * New node file
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myfacebook');
var db=mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));

//open the connection 
db.once('open', function() {
	var UserSchema = new mongoose.Schema({
		fname : String,
		lname : String,
		"email" : String,
		"pwd" : String,
		"dob" : String,
		"gender" : String
		});
		var User = mongoose.model('users', UserSchema);
		
		var usr = new User({
			
			});

		User.save(function(err, usr) {
			  if (err) return console.error(err);
			  console.dir(usr);
			});
		
});