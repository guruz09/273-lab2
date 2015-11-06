/**
 * http://usejsdoc.org/
 */

var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/myfacebook";
var mongoose = require('mongoose');
var friends = require('./friendModel');

exports.handle_addfriends_request = function(msg, callback){
	
	
	var me = msg.me;
	var myfrnd = msg.myfrnd;
	var stat = msg.status;
	
	var res = {};
	
	console.log("In adding friends fr : "+ me + " " + myfrnd );
	
	var db = mongoose.connection; 
	mongoose.connect('mongodb://localhost:27017/myfacebook');
	db.on('error',console.error.bind(console, 'connection error:'));
			
	//open the connection 
	db.once('open', function() {
					
		var frnd = new friends ({
			email : me, 
			femail : myfrnd,
			status : stat
		});
					
		console.log("Saving frnd here"+ frnd);

		frnd.save(function(err, frnd) {
			if (err) { 
				res.code = 401;
				res.value = "Failed to add";
				console.log("res.value in login server"+res.value);
				return console.error(err); 
			}else{
				res.code = 200;
				res.value = "Succes in adding friend";
				console.log("res.value in login server"+res.value);
				console.log("I am here " );
			}
			callback(null, res);	
			console.dir(frnd);
			mongoose.connection.close();
		});	
		
	});
	
};

