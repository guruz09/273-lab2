/**
 * New node file
 */
var ejs = require("ejs");
var mysql = require('./mySql');
var mq_client = require('../rpc/client');

function createGroup(req,res){
	
	var email = req.param("email");
	var gname = req.param("gname");
	var about = req.param("about");
	
	console.log(email +" is the admin name");
	console.log(gname +" is the group");
	console.log(about +" is about this group");
	
	
	var msg_payload = {"email" : email, "gname" : gname, "about":about };
	
	mq_client.make_request('addgroup_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			console.log("Result is: " + results.code);
			if(results.code == 200){
				console.log("group added fine");				
				res.json({
					value : 1 
				});			
			}
			else {    				
				console.log("couldnt add the group");
				res.json({
					value : 0 
				});
			}
		}  
	});	
}

function deleteGroup(req,res){	
	mysql.deleteGroupSQL(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.affectedRows > 0){
				console.log("group deleted");
				//console.log("results:"+results);
				res.json({
					msg:"group deleted"
				});
			}
			else {    
				
				res.json({
					msg:"group not deleted"
				});
				console.log("group not deleted");
			}
		}  
	},req);
}

function addGroupMember(req,res){
	addGroupMember
	var email = req.param("email");
	var gname = req.param("gname");
	
	console.log(email +" is the admin name");
	console.log(gname +" is the group");
	
	var msg_payload = {"email" : email, "gname" : gname };
	
	mq_client.make_request('addgroupmem_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{			
			if(results.code == 200){
				console.log("group mem added fine");				
				res.json({
					value : 1 
				});			
			}
			else {    				
				console.log("couldnt add the group");
				res.json({
					value : 0 
				});
			}
		}  
	});	
}

function deleteGroupMember(req,res){
	mysql.deleteGroupMemberSQL(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results == 1){
				console.log("Group member deleted");
				//console.log("results:"+results);
				res.json({
					value: 1
				});
			}
			else {    
				
				res.json({
					value: 0
				});
				console.log("Group Member not deleted");
			}
		}  
	},req);	
}

function getGroups(req,res){
	mysql.getGroupsSQL(function(err,results){
		if(err){
			res.json({
				value: 0
			});
		}
		else 
		{
			if(results.length > 0){
				console.log("Groups listed");
				//console.log("results:"+results);
				res.json({
					value:results
				});
			}
			else {    
				
				res.json({
					value: 0
				});
				console.log("Groups not listed");
			}
		}  
	},req);
}

function getGroupNames(req,res){
	mysql.getGroupNamesSQL(function(err,results){
		if(err){
			res.json({
				value: 0
			});
		}
		else 
		{
			if(results.length > 0){
				console.log("Groups listed");
				//console.log("results:"+results);
				res.json({
					value:results
				});
			}
			else {    
				
				res.json({
					value: 0
				});
				console.log("Groups not listed");
			}
		}  
	},req);
}

function showGroupMember(req,res){
	var validateMem="select * from loginInfo where userId = '"+req.body.memberConfirmed+"';";
	//var getGrpMem="select memberConfirmed from groupMember where groupId = (select groupId from groupInfo where groupName = '"+req.body.groupName+"');";
	var getGrpMem ="select fname,lname from signupinfo where userid IN (select memberConfirmed from groupMember where groupId = (select groupId from groupInfo where groupName = '"+req.body.groupName+"'));";
	console.log("Query is:"+validateMem);
	console.log("Query is:"+getGrpMem);
	
	mysql.showGroupMemberSQL(function(err,results){
		if(err){
			res.json({
				value:0
			});
		}
		else 
		{
			if(results.length > 0){
				console.log("group members extracted");
				
				res.json({
					value:results
				});
			}
			else {    
				
				res.json({
					value:0
				});
				console.log("group members not extracted");
			}
		}  
	},validateMem,getGrpMem);
}

function showGroupMemberForOwner(req,res){
	var validateMem="select * from loginInfo where userId = '"+req.body.memberConfirmed+"';";
	var getGrpMem="select fname,lname from signupinfo where userid IN (select memberConfirmed from groupMember where groupId = (select groupId from groupInfo where groupName = '"+req.body.groupName+"' and createdBy = '"+req.body.memberConfirmed+"'));";
	console.log("Query is:"+validateMem);
	console.log("Query is:"+getGrpMem);
	
	mysql.showGroupMemberSQL(function(err,results){
		if(err){
			res.json({
				value:0
			});
		}
		else 
		{
			if(results.length > 0){
				console.log("group members extracted");
				res.json({
					value:results
				});
			}
			else {    
				
				res.json({
					value:0
				});
				console.log("group members not extracted");
			}
		}  
	},validateMem,getGrpMem);
}



exports.createGroupapi = createGroup;
exports.deleteGroupapi = deleteGroup;
exports.addGroupMemberapi = addGroupMember;
exports.deleteGroupMemberapi = deleteGroupMember;
exports.getGroupsapi = getGroups;
exports.showGroupMemberapi = showGroupMember;
exports.showGroupMemberForOwnerapi = showGroupMemberForOwner;
exports.getGroupNamesapi = getGroupNames;
