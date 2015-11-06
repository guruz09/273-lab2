/**
 * http://usejsdoc.org/
 */

var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/myfacebook";
var mongoose = require('mongoose');
var posts = require('./postsModel');


exports.handle_getpostfeed_request = function(msg, callback){

	var res = {};
	var email = msg.email;
				
	console.log("In gettings post fr : " + email );
		
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);	
		var coll = mongo.collection('friends');
		var frndslist = [];
		
		coll.find( {email: email},{femail:1,_id:0}).sort( { ins_on: 1 } ).toArray(function(err, docs) {
			if(docs){
				console.log("in the friends area");
				
				for(var x=0; x<docs.length; x++){
					console.log("Data is - "+ docs[x].femail);
					frndslist.push(docs[x].femail);
				}
				frndslist.push(email);
				console.log("Data in array is "+ frndslist);
				
				var coll1 = mongo.collection('posts');
				
				coll1.find( {email: {$in : frndslist} },{_id:0},{sort: {ins_on: -1}} ).toArray(function(err, docs) {
					if(docs){
						console.log(docs);						
						var myArray = [];
						for(var i=0; i<docs.length; i++){
							myArray.push({"email": docs[i].email, "name":docs[i].name, "post":docs[i].post});
						}
						
						res = myArray;						
			//			console.log("the response is "+ res[0].name);
					}else{						
						res.code = "401";
					}	
				//	console.log("Before callback -"+res[0].name);			
					callback(null, res);
				});
			}
			else{
				res.code = "401";				
			}						
		});
	});		
};


function getuname(email, callback){
	var name="";
	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('users');
		coll.findOne({email: email}, function(err, user){ 
			if(user){
				console.log(user);				
				name = user.name.fname + " " + user.name.lname;
				console.log("name of the poster "+ name);				
			}
			else{
				name = "raghu";
			}
			console.log("Name before ccall "+ name);
			callback(name);
		});
	});
}

exports.handle_postfeed_request = function(msg, callback){
	
	var res = {};
	var email = msg.email;
	var upd = msg.post;
	var db = mongoose.connection;	
	getuname(email, function(name) {
		mongoose.connect('mongodb://localhost:27017/myfacebook');
		db.on('error',console.error.bind(console, 'connection error:'));
				
		console.log("In adding post fr : "+ upd + " " + email );	
		
		//open the connection 
		db.once('open', function() {						
			var post = new posts({
				name : name,
				email : email, 
				post : upd,
				ins_on : new Date()
			});
										
			console.log("Saving post here"+ post);

			post.save(function(err, post) {
				if (err) { 
					res.code = 401;
					res.value = "Failed to post";
					console.log("res.value in feed server"+res.value);
					return console.error(err); 
				}else{
					res.code = 200;
					res.value = "Succes in posted";
					console.log("res.value in post server"+res.value);
					console.log("I am here " );
				}
				callback(null, res);	
				console.dir(post);
				mongoose.connection.close();
			});		
		});	
	});
};
				
exports.getuname = getuname;
