var ejs = require("ejs");
var mysql = require('./mySql');
var mq_client = require('../rpc/client');


function login(req,res)
{
	var username = req.param("email");
	var password = req.param("password");
	
	console.log(username +" is the uname");
	console.log(password +" is the pwd");
	
	
	var msg_payload = {"email" : username, "password" : password };
	
	mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			console.log("Result is: " + results.code);
			if(results.code == 200){
				console.log("login successful");				
				res.json({
					value : 1 
				});			
			}
			else {    				
				console.log("unable to login");
				res.json({
					value : 0 
				});
			}
		}  
	});
}


function signUP(req,res)
{
	
	var fname1 = req.param('firstname');
	var lname1 = req.param('lastname');
	var email1 = req.param('email');
	var pwd1 = req.param('password');
	var dob1 = req.param('dob');
	var gender1 = req.param('gender');	
	
	console.log("Im in signup");
	console.log("fname " + fname1); 
	console.log("fname " + lname1);
	console.log("fname " + email1);
	console.log("fname " + pwd1);
	console.log("fname " + dob1);
	console.log("fname " + gender1);
	
	
	var msg_payload = { "firstname" : fname1, "lastname" : lname1, "email" : email1, "password" : pwd1, "dob" : dob1, "gender" : gender1 };
	console.log("register:"+msg_payload);
	mq_client.make_request('register_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("registered successfully");		
				console.log()
				res.json({
					value : 1
				});
			}
			else if(results.code == 401){    			
				console.log("unable to register");
				res.json({
					value : 0
				});
			}else{
				res.json({
					value : -1
				});
			}
		}  
	});	
}




function enterPersonalInfo(req,res)
{
	
	mysql.executeTransactionWithoutQuery(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.affectedRows > 0){
				console.log("User details updated");
				//console.log("results:"+results);
				res.json({
					msg:"User details updated"
				});
			}
			else {    
				
				res.json({
					msg:"User details not updated"
				});
				console.log("User details not updated");
			}
		}  
	},req);
	
}


function extractPersonalInfo(req,res){
	var validateMem="select * from loginInfo where userId = '"+req.body.userId+"';";
	var getUserInfo="select * from userInfo where userId = '"+req.body.userId+"' ORDER BY timeStamp DESC;";
	console.log("Query is:"+validateMem);
	console.log("Query is:"+getUserInfo);
	
	mysql.extractPersonalInfoSQL(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("user info extracted");
				//console.log("results:"+results);
				res.json({
					msg:results
				});
			}
			else {    
				
				res.json({
					msg:"user info not extracted"
				});
				console.log("user info not extracted");
			}
		}  
	},validateMem,getUserInfo);
}


function getPersonalInfo(req,res){
	var validateMem="select * from loginInfo where userId = '"+req.body.userId+"';";
	var getSignupInfo="select * from signUpInfo where userId = '"+req.body.userId+"';";
	console.log("Query is:"+validateMem);
	console.log("Query is:"+getSignupInfo);
	
	mysql.getPersonalInfoSQL(function(err,results){
		if(err){
			res.json({
				value: 0
			});
		}
		else if(results == null){
			res.json({
				value: 0
			});
		}
		else
		{
			
				//console.log("signup info extracted");
				//console.log("results:"+results[0]);
				res.json({
					value:results
				});
			
		}  
	},validateMem,getSignupInfo);
}

function getOverviewInfo(req,res){
	var validateMem="select * from loginInfo where userId = '"+req.body.userId+"';";
	var getSignupInfo="select * from userInfo where userId = '"+req.body.userId+"' and masterId = '"+req.body.masterId+"' ORDER BY timeStamp DESC;";
	console.log("Query is:"+validateMem);
	console.log("Query is:"+getSignupInfo);
	
	mysql.getPersonalInfoSQL(function(err,results){
		if(err){
			res.json({
				value: 0
			});
		}
		else if(results == null){
			res.json({
				value: 0
			});
		}
		else
		{
				res.json({
					value:results
				});
			
		}  
	},validateMem,getSignupInfo);
}

exports.loginapi = login;
exports.signUPapi = signUP;
exports.enterPersonalInfoapi = enterPersonalInfo;
exports.extractPersonalInfoapi = extractPersonalInfo;
exports.getPersonalInfoapi = getPersonalInfo;
exports.getOverviewInfoapi= getOverviewInfo;