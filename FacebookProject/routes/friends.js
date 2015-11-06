/**
 * New node file
 */
var ejs = require("ejs");
var mysql = require('./mySql');
var mq_client = require('../rpc/client');

function sendFriendReq(req,res){
	
	var status = req.param("status");
	var me = req.param("me");
	var myfrnd = req.param("myfrnd");
	
	
	var msg_payload = {"me" : me, "myfrnd" : myfrnd, "status" : status };
	console.log(msg_payload);
	mq_client.make_request('friends_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			console.log("Result is: " + results.code);
			if(results.code == 200){
				console.log("friend added");				
				res.json({
					value : 1 
				});			
			}
			else {    				
				console.log("unable to add friend");
				res.json({
					value : 0 
				});
			}
		}  
	});
	
//	var validateLogin="select * from loginInfo where userId IN ('"+req.body.userId+"','"+req.body.requestSentTo+"');";
//	var sendFriendRq="insert into friendRequest values ('"+req.body.userId+"','"+req.body.requestSentTo+"','"+status+"',NOW());";
//	console.log("Query is:"+validateLogin);
//	console.log("Query is:"+sendFriendRq);
//	
//	mysql.sendFriendReqSQL(function(err,results){
//		if(err){
//			throw err;
//		}
//		else 
//		{
//			if(results.affectedRows > 0){
//				console.log("Friend request sent");
//				//console.log("results:"+results);
//				res.json({
//					msg:"Friend request sent"
//				});
//			}
//			else {    
//				
//				res.json({
//					msg:"Friend request not sent"
//				});
//				console.log("Friend request not sent");
//			}
//		}  
//	},validateLogin,sendFriendRq);
	
}

function acceptFriendReq(req,res){
	
	var status = "Pending";
	var validateLogin="select * from friendRequest where userId = '"+req.body.userId+"' AND requestSentTo = '"+req.body.friendWith+"';";
	var acceptFriendRq1="insert into friendConfirmed values ('"+req.body.userId+"','"+req.body.friendWith+"',NOW());";
	var acceptFriendRq2="insert into friendConfirmed values ('"+req.body.friendWith+"','"+req.body.userId+"',NOW());";
	console.log("Query is:"+validateLogin);
	console.log("Query is:"+acceptFriendRq1);
	console.log("Query is:"+acceptFriendRq2);
	
	mysql.acceptFriendReqSQL(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.affectedRows > 0){
				console.log("Friend request accepted");
				//console.log("results:"+results);
				res.json({
					msg:"Friend request accepted"
				});
			}
			else {    
				
				res.json({
					msg:"Friend request not accepted"
				});
				console.log("Friend request not accepted");
			}
		}  
	},validateLogin,acceptFriendRq1,acceptFriendRq2);
	
	
}

function getFriends(req,res){
	
	var validateLogin="select * from loginInfo where userId = '"+req.body.userId+"';";
	var listFriendRq="select friendWith from friendConfirmed where userId = '"+req.body.userId+"' ORDER BY friendWith ASC;";
	console.log("Query is:"+validateLogin);
	console.log("Query is:"+listFriendRq);
	
	mysql.getFriendsSQL(function(err,results){
		if(err){
			res.json({
				value : 0
			});
		}
		else 
		{
			if(results.length > 0){
				console.log("Friends list fetched");
				//console.log("results:"+results);
				res.json({
					value : results
				});
			}
			else {    
				
				res.json({
					value : 0
				});
				console.log("Friends list not fetched");
			}
		}  
	},validateLogin,listFriendRq);
	
}


exports.sendFriendReqapi = sendFriendReq;
exports.acceptFriendReqapi = acceptFriendReq;
exports.getFriendsapi = getFriends;