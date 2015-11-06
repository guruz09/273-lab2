/**
 * http://usejsdoc.org/
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/myfacebook";
var mongoose = require('mongoose');
var Group = require('./groupModel');
var post = require('./posts');

exports.handle_addgroups_request = function(msg, callback){

	var email = msg.email;
	var gname = msg.gname;
	var about = msg.about;
	
	var res = {};
	
	console.log("In adding groups fr : "+ email+ " " + gname);
	
	post.getuname(email, function(memname) {
		var db = mongoose.connection; 
		mongoose.connect('mongodb://localhost:27017/myfacebook');
		db.on('error',console.error.bind(console, 'connection error:'));
				
		//open the connection 
		db.once('open', function() {
								
			var group = new Group({
				groupname : gname,
				members : [{
					name : memname,
					email : email
				}],
				about : about,
				ins_on : new Date()
			});
						
			group.save(function(err, frnd) {
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
	});
};




exports.handle_addgroupmembrs_request = function(msg, callback){

	var email = msg.email;
	var gname = msg.gname;
	
	var res = {};
	
	console.log("In adding mem fr : "+ email+ " " + gname);
	
	post.getuname(email, function(memname) {
		
		mongo.connect(mongoURL, function(){
			var coll = mongo.collection('groups');
			
			coll.updateOne({groupname : gname}, 
					{ $push : {"members" : {  name : memname, email : email } }}, 
					{upsert : true}, function(err, result) {
						if (err) {
							res.code = "401";
							res.value = "Failed";
						} else if (result) {				
							res.code = "200";
							res.value = "Done";									
						} else {
							res.code = "401";
							res.value = "Failed";
						}
						callback(null, res);
				});
		});
	});
};


