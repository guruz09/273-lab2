
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/myfacebook";
var mongoose = require('mongoose');
var Users = require('./userModel');

exports.handle_login_request = function(msg, callback){
	
	var res = {};
	console.log("In handle request - email:"+ msg.email + " pw word: " + msg.password);
	
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('users');
		
		coll.findOne({email: msg.email, pwd:msg.password }, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				console.log("in IF case");
				res.code = 200;
				res.value = "Succes Login";
			} 
			else {
				console.log("in ELSE case");
				res.code = 401;
				res.value = "Failed Login";
			}

			console.log("Results inside login server"+res);
			callback(null,res);
		});
			
	});
	
};

checkuser = function(email, callback){
	var data = 0;
	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('users');
		coll.findOne({email: email}, function(err, user){ 
			if(user){
				data = 1;
				console.log("User exist from check user");
				callback(data);
			}
			else{
				console.log("fresh user");
				callback(data);
			}
		});
	});
}

exports.handle_register_request = function(msg, callback){
	
	
	var uemail = msg.email;
	var res = {};
	
	console.log("In check user: "+ uemail);
	checkuser(uemail, function(data){
		if(data == 1){
			console.log("Reply from checkuser: " + data);
			res.code = 400;
			res.value = "Failed reg";
			callback(null, res);	
		}
		else{
			var db = mongoose.connection; 
			mongoose.connect('mongodb://localhost:27017/myfacebook');
			db.on('error',console.error.bind(console, 'connection error:'));
			
			//open the connection 
			db.once('open', function() {
				
				
								
				var usr = new Users({
					_id: msg.email,
					name: { 
						fname : msg.firstname,
						lname : msg.lastname
					},					
					email : msg.email,
					pwd : msg.password,
					dob : msg.dob,
					gender : msg.gender
				});
					
				console.log("Saving user here"+usr);
				usr.save(function(err, usr) {
					if (err) {  
						res.code = 401;
						res.value = "Failed reg";
						console.log("res.value in login server"+res.value);
						return console.error(err); 
					}else{
						res.code = 200;
						res.value = "Succes reg";
						console.log("res.value in login server"+res.value);
						console.log("I am here " );
					}
					callback(null, res);	
					console.dir(usr);
					mongoose.connection.close();
				});		
				
			});
			
			
		}
	});	
};

exports.handle_user_request = function(msg, callback){
	
	var res = {};
	var username = msg.email;
	console.log("sending user details for :"+ msg.email);
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('users');
		coll.findOne({email: username}, function(err, user){
			if (user) {
			//	console.log(req.session.username +" is the session");
				res = user;
				res.code = "200";
				res.value = "Succes";
				console.log(" "+res);
				
			} 
			else {
				res.code = "401";
				res.value = "Fail";
			}
			callback(null, res);
		});
	});
	
	
	
};