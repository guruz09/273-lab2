/**
 * New node file
 */
var ejs = require("ejs");
var mysql = require('./mySql');
var mq_client = require('../rpc/client');

function createNewsFeed(req,res){
	
	var email = req.param("userId");
	var post = req.param("feeds");
	
	var msg_payload = {"email" : email, "post" : post};
	
	console.log(msg_payload);
	mq_client.make_request('posts_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			console.log("Result is: " + results.code);
			if(results.code == 200){
				console.log("post updated");				
				res.json({
					value : 1					
				});			
			}
			else {    				
				console.log("unable to post");
				res.json({
					value : 0 
				});
			}
		}  
	});
	
	
//	var validateLogin="select * from loginInfo where userId = '"+req.body.userId+"';";
//	var createFeed="insert into newsFeeds values('"+req.body.userId+"','"+req.body.feeds+"',+NOW());";
//	console.log("Query is:"+validateLogin);
//	console.log("Query is:"+createFeed);
//	
//	mysql.createNewsFeedSQL(function(err,results){
//		if(err){
//			throw err;
//		}
//		else 
//		{
//			if(results.affectedRows > 0){
//				console.log("Feed created");
//				//console.log("results:"+results);
//				res.json({
//					msg:"Feed created"
//				});
//			}
//			else {    
//				
//				res.json({
//					msg:"Feed not created"
//				});
//				console.log("Feed not created");
//			}
//		}  
//	},validateLogin,createFeed);
}

function deleteNewsFeed(req,res){
	var validateLogin="select * from loginInfo where userId = '"+req.body.userId+"';";
	var deletefeed="delete from newsFeeds where userId = '"+req.body.userId+"' AND feeds = '"+req.body.feeds+"';";
	console.log("Query is:"+validateLogin);
	console.log("Query is:"+deletefeed);
	
	mysql.deleteNewsFeedSQL(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.affectedRows > 0){
				console.log("Feed deleted");
				//console.log("results:"+results);
				res.json({
					msg:"Feed deleted"
				});
			}
			else {    
				
				res.json({
					msg:"Feed not deleted"
				});
				console.log("Feed not deleted");
			}
		}  
	},validateLogin,deletefeed);
}

function showNewsFeed(req,res){
	var validateLogin="select * from loginInfo where userId = '"+req.body.userId+"';";
	var showFeed="select feeds from newsFeeds where userId = '"+req.body.userId+"' ORDER BY timeStamp DESC;";
	console.log("Query is:"+validateLogin);
	console.log("Query is:"+showFeed);
	
	mysql.showNewsFeedSQL(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("Feeds fetched");
				//console.log("results:"+results);
				res.json({
					msg:results
				});
			}
			else {    
				
				res.json({
					msg:"Feeds not fetched"
				});
				console.log("Feeds not fetched");
			}
		}  
	},validateLogin,showFeed);
}

function showAllNewsFeed(req,res){
	
	var me = req.param("userId");
	var	msg_payload = {"email" : me};
	
	console.log(msg_payload);
	
	mq_client.make_request('getposts_queue',msg_payload, function(err,results){
		
		console.log("im in res "+ results[0].post);
		if(err){
			throw err;
		}
		else 
		{
			console.log("Result is: " + results[0].name);
			if(results.code == 401){
				console.log("unable to post");
				res.json({
					code : "401",
					value : "fail"
				});
			}
			else {    
				console.log("feeds are below: "+ results);				
				res.json({
					value : results					
				});			
				
			}
		}  
	});
}




exports.createNewsFeedapi = createNewsFeed;
exports.deleteNewsFeedapi = deleteNewsFeed;
exports.showNewsFeedapi = showNewsFeed;
exports.showAllNewsFeedapi = showAllNewsFeed;