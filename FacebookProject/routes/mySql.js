/**
 * New node file
 */
var ejs= require('ejs');
var mysql = require('mysql');

function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'rootpwd1',
	    database : 'myFacebook',
	    port	 : 3306
	});
	return connection;
}


function executeQuery(callback,sqlQuery){
	
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
			callback(err, rows);
		}
		else 
		{	
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	


function executeTransaction(callback,sqlQuery1,sqlQuery2,sqlQuery0){
	
	var response;
	var connection=getConnection();
	connection.query(sqlQuery0, function(err, rows, fields) {
		if(err){
			console.log("ERROR1: " + err.message);
			connection.rollback(function() {
				response = 0;
				callback(err, response);
		      });
		}
		
		else if(rows.length > 0){
			response = -1;
			callback(err, response);
		}
	});
	
	
	connection.beginTransaction(function(err){
		if(err) { 
			response = 0;
			callback(err, response);
		}
		else {
			
			connection.query(sqlQuery1, function(err, rows, fields) {
				if(err){
					console.log("ERROR1: " + err.message);
					connection.rollback(function() {
						response = 0;
						callback(err, response);
				      });
				}
				
				else {
					console.log("login table updated");
					console.log("query 1:"+sqlQuery1);
					console.log("rows1:"+rows);
					
					connection.query(sqlQuery2, function(err, rows, fields) {
						if(err){
							console.log("ERROR2: " + err.message);
							connection.rollback(function() {
								response = 0;
								callback(err, response);
						      });
							
						}
						else {
							connection.commit(function(err) {
								if (err) { 
									connection.rollback(function() {
										response = 0;
										callback(err, response);
									});
								}
								
							});
							console.log("signupInfo table updated");
							response = 1;
							callback(err, response);
						}
						
					});
				}
				
			});
			
		}
		
	});
}	


function executeTransactionWithoutQuery(callback,req){
	
	var connection=getConnection();
	connection.beginTransaction(function(err){
		if(err) { throw err;}
		else {
			var sqlQuery1="select * from loginInfo where userId='"+req.body.userId+"';";
			connection.query(sqlQuery1, function(err, rows, fields) {
				if(err){
					console.log("ERROR1: " + err.message);
					connection.rollback(function() {
				        throw err;
				      });
				}
				else {
					console.log("valid user");
					var sqlQuery2="select masterId from masterRecord where section='"+req.body.section+"';";
					connection.query(sqlQuery2, function(err, rows, fields) {
						if(err){
							console.log("ERROR1: " + err.message);
							connection.rollback(function() {
						        throw err;
						      });
						}
						else {
							console.log("master id obtained");
							if(rows.length > 0){
								var masterkey = rows[0].masterId;
								var sqlQuery3="insert into userInfo values ('"+req.body.userId+"','"+masterkey+"','"+req.body.description+"',NOW());";
								connection.query(sqlQuery3, function(err, rows, fields) {
									if(err){
										console.log("ERROR2: " + err.message);
										connection.rollback(function() {
									        throw err;
									      });
									}
									else {
										connection.commit(function(err) {
											if (err) { 
												connection.rollback(function() {
										            throw err;
												});
											}
											else {
												console.log("User Personal Info Updated");
											}
										});
									}
								});
							}
							
							
						}
					});
					
				}
				
			});
		}
	});
	
}	


function sendFriendReqSQL(callback,sqlQuery1,sqlQuery2){
	
	
	var connection=getConnection();
	
	connection.beginTransaction(function(err){
		if(err) { throw err;}
		else {
			
			connection.query(sqlQuery1, function(err, rows, fields) {
				if(err){
					console.log("ERROR1: " + err.message);
					connection.rollback(function() {
				        throw err;
				      });
				}
				
				else if(rows.length > 1){
					
					console.log("rows.length"+rows.length);
					console.log("user input validated");
					//console.log("query 1:"+sqlQuery1);
					//console.log("rows1:"+rows);
										
					connection.query(sqlQuery2, function(err, rows, fields) {
						if(err){
							console.log("ERROR2: " + err.message);
							connection.rollback(function() {
						        throw err;
						      });
							
						}
						else {
							connection.commit(function(err) {
								if (err) { 
									connection.rollback(function() {
							            throw err;
									});
								}
								
							});
							console.log("friend request sent");
							callback(err, rows);
						}
						
					});
				}
				else {
					console.log("friend request not sent");
					connection.rollback(function() {
				        throw err;
				      });
				}
				
			});
			
		}
		
	});
}	




function acceptFriendReqSQL(callback,sqlQuery1,sqlQuery2,sqlQuery3){
	
	
	var connection=getConnection();
	
	connection.beginTransaction(function(err){
		if(err) { throw err;}
		else {
			
			connection.query(sqlQuery1, function(err, rows, fields) {
				if(err){
					console.log("ERROR1: " + err.message);
					connection.rollback(function() {
				        throw err;
				      });
				}
				
				else if(rows.length > 0){
					
					//console.log("rows.length"+rows.length);
					console.log("user input validated");
					//console.log("query 1:"+sqlQuery1);
					//console.log("rows1:"+rows);
										
					connection.query(sqlQuery2, function(err, rows, fields) {
						if(err){
							console.log("ERROR2: " + err.message);
							connection.rollback(function() {
						        throw err;
						      });
							
						}
						else {
							connection.query(sqlQuery3, function(err, rows, fields) {
								if(err){
									console.log("ERROR3: " + err.message);
									connection.rollback(function() {
								        throw err;
								      });
									
								}
								else {
									
									connection.commit(function(err) {
										if (err) { 
											connection.rollback(function() {
									            throw err;
											});
										}
										
									});
									console.log("friend request accepted");
									callback(err, rows);
									
								}
								
							});
						}
						
					});
				}
				else {
					console.log("friend request not accepted");
					connection.rollback(function() {
				        throw err;
				      });
				}
				
			});
			
		}
		
	});
}


function getFriendsSQL(callback,sqlQuery1,sqlQuery2){
var connection=getConnection();
	
	connection.beginTransaction(function(err){
		if(err) { callback(err, null);}
		else {
			
			connection.query(sqlQuery1, function(err, rows, fields) {
				if(err){
					console.log("ERROR1: " + err.message);
					connection.rollback(function() {
						callback(err, null);
				      });
				}
				
				else if(rows.length > 0){
					
					//console.log("rows.length"+rows.length);
					console.log("user input validated");
					//console.log("query 1:"+sqlQuery1);
					//console.log("rows1:"+rows);
										
					connection.query(sqlQuery2, function(err, rows, fields) {
						if(err){
							console.log("ERROR2: " + err.message);
							connection.rollback(function() {
								callback(err, null);
						      });
							
						}
						else {
							connection.commit(function(err) {
								if (err) { 
									connection.rollback(function() {
										callback(err, null);
									});
								}
								
							});
							console.log("friend request accepted");
							callback(null, rows);
						}
						
					});
				}
				else {
					console.log("friend request not fetched");
					connection.rollback(function() {
						callback(err, null);
				      });
				}
				
			});
			
		}
		
	});
}


function createNewsFeedSQL(callback,sqlQuery1,sqlQuery2){
var connection=getConnection();
	
	connection.beginTransaction(function(err){
		if(err) { throw err;}
		else {
			
			connection.query(sqlQuery1, function(err, rows, fields) {
				if(err){
					console.log("ERROR1: " + err.message);
					connection.rollback(function() {
				        throw err;
				      });
				}
				
				else if(rows.length > 0){
					
					//console.log("rows.length"+rows.length);
					console.log("user input validated");
					//console.log("query 1:"+sqlQuery1);
					//console.log("rows1:"+rows);
										
					connection.query(sqlQuery2, function(err, rows, fields) {
						if(err){
							console.log("ERROR2: " + err.message);
							connection.rollback(function() {
						        throw err;
						      });
							
						}
						else {
							connection.commit(function(err) {
								if (err) { 
									connection.rollback(function() {
							            throw err;
									});
								}
								
							});
							console.log("feed created");
							callback(err, rows);
						}
						
					});
				}
				else {
					console.log("feed not created");
					connection.rollback(function() {
				        throw err;
				      });
				}
				
			});
			
		}
		
	});
}

function deleteNewsFeedSQL(callback,sqlQuery1,sqlQuery2){
var connection=getConnection();
	
	connection.beginTransaction(function(err){
		if(err) { throw err;}
		else {
			
			connection.query(sqlQuery1, function(err, rows, fields) {
				if(err){
					console.log("ERROR1: " + err.message);
					connection.rollback(function() {
				        throw err;
				      });
				}
				
				else if(rows.length > 0){
					
					//console.log("rows.length"+rows.length);
					console.log("user input validated");
					//console.log("query 1:"+sqlQuery1);
					//console.log("rows1:"+rows);
										
					connection.query(sqlQuery2, function(err, rows, fields) {
						if(err){
							console.log("ERROR2: " + err.message);
							connection.rollback(function() {
						        throw err;
						      });
							
						}
						else {
							connection.commit(function(err) {
								if (err) { 
									connection.rollback(function() {
							            throw err;
									});
								}
								
							});
							console.log("feed deleted");
							callback(err, rows);
						}
						
					});
				}
				else {
					console.log("feed not deleted");
					connection.rollback(function() {
				        throw err;
				      });
				}
				
			});
			
		}
		
	});	
}

function showNewsFeedSQL(callback,sqlQuery1,sqlQuery2){
var connection=getConnection();
	
	connection.beginTransaction(function(err){
		if(err) { throw err;}
		else {
			
			connection.query(sqlQuery1, function(err, rows, fields) {
				if(err){
					console.log("ERROR1: " + err.message);
					connection.rollback(function() {
				        throw err;
				      });
				}
				
				else if(rows.length > 0){
					
					//console.log("rows.length"+rows.length);
					console.log("user input validated");
					//console.log("query 1:"+sqlQuery1);
					//console.log("rows1:"+rows);
										
					connection.query(sqlQuery2, function(err, rows, fields) {
						if(err){
							console.log("ERROR2: " + err.message);
							connection.rollback(function() {
						        throw err;
						      });
							
						}
						else {
							connection.commit(function(err) {
								if (err) { 
									connection.rollback(function() {
							            throw err;
									});
								}
								
							});
							console.log("feeds listed");
							callback(err, rows);
						}
						
					});
				}
				else {
					console.log("feed not listed");
					connection.rollback(function() {
				        throw err;
				      });
				}
				
			});
			
		}
		
	});	
}


function createGroupSQL(callback,sqlQuery1,sqlQuery2,sqlQuery3){
var connection=getConnection();
	
	connection.beginTransaction(function(err){
		if(err) { throw err;}
		else {
			
			connection.query(sqlQuery1, function(err, rows, fields) {
				if(err){
					console.log("ERROR1: " + err.message);
					connection.rollback(function() {
				        throw err;
				      });
				}
				
				else if(rows.length > 0){
					
					//console.log("rows.length"+rows.length);
					console.log("user input validated");
					//console.log("query 1:"+sqlQuery1);
					//console.log("rows1:"+rows);
										
					connection.query(sqlQuery2, function(err, rows, fields) {
						if(err){
							console.log("ERROR2: " + err.message);
							connection.rollback(function() {
						        throw err;
						      });
							
						}
						else {
							connection.query(sqlQuery3, function(err, rows, fields) {
								if(err){
									console.log("ERROR3: " + err.message);
									connection.rollback(function() {
								        throw err;
								      });
									
								}
								else {
									
									var groupId = rows[0].groupId;
									var createdBy = rows[0].createdBy;
									var sqlQuery4 = "insert into groupMember values ("+groupId+",'"+createdBy+"',NOW());";
									console.log("SQLquery4:"+sqlQuery4);
									connection.query(sqlQuery4, function(err, rows, fields) {
										if(err){
											console.log("ERROR3: " + err.message);
											connection.rollback(function() {
										        throw err;
										      });
										}
										else {
												connection.commit(function(err) {
													if (err) { 
														connection.rollback(function() {
												            throw err;
														});
													}
													
												});
												console.log("Group created successful");
												callback(err, rows);
											}
									});
								}
								
							});
						}
						
					});
				}
				else {
					console.log("group creation is not successful");
					connection.rollback(function() {
				        throw err;
				      });
				}
				
			});
			
		}
		
	});	
}

function deleteGroupSQL(callback,sqlQuery1){
	var connection=getConnection();
		
		connection.beginTransaction(function(err){
			if(err) { throw err;}
			else {
				
				connection.query(sqlQuery1, function(err, rows, fields) {
					if(err){
						console.log("ERROR1: " + err.message);
						connection.rollback(function() {
					        throw err;
					      });
					}
					
					else if(rows.length > 0){
						
						//console.log("rows.length"+rows.length);
						console.log("user input validated");
						//console.log("query 1:"+sqlQuery1);
						//console.log("rows1:"+rows);
											
						connection.query(sqlQuery2, function(err, rows, fields) {
							if(err){
								console.log("ERROR2: " + err.message);
								connection.rollback(function() {
							        throw err;
							      });
								
							}
							else {
								connection.query(sqlQuery3, function(err, rows, fields) {
									if(err){
										console.log("ERROR3: " + err.message);
										connection.rollback(function() {
									        throw err;
									      });
										
									}
									else {
										
										connection.commit(function(err) {
											if (err) { 
												connection.rollback(function() {
										            throw err;
												});
											}
											
										});
										console.log("Group deleted successful");
										callback(err, rows);
									}
									
								});
							}
							
						});
					}
					else {
						console.log("group delete not successful");
						connection.rollback(function() {
					        throw err;
					      });
					}
					
				});
				
			}
			
		});	
	}



function addGroupMemberSQL(callback,req){
	var connection=getConnection();
	connection.beginTransaction(function(err){
		if(err) { callback(err, null);}
		else {
			var sqlQuery1="select * from loginInfo where userId='"+req.body.createdBy+"';";
			//console.log("Query: "+sqlQuery1);
			connection.query(sqlQuery1, function(err, rows, fields) {
				if(err){
					console.log("ERROR1: " + err.message);
					connection.rollback(function() {
						callback(err, null);
				      });
				}
				else {
					console.log("valid user");
					var sqlQuery2="select groupId from groupInfo where groupName='"+req.body.groupName+"' AND createdBy='"+req.body.createdBy+"';";
					connection.query(sqlQuery2, function(err, rows, fields) {
						if(err){
							console.log("ERROR2: " + err.message);
							connection.rollback(function() {
								callback(err, null);
						      });
						}
						else {
							console.log("group id obtained");
							if(rows.length > 0){
								var groupId = rows[0].groupId;
								var sqlQuery3="insert into groupMember values('"+groupId+"','"+req.body.memberConfirmed+"',NOW());";
								console.log(sqlQuery3);
								connection.query(sqlQuery3, function(err, rows, fields) {
									if(err){
										console.log("ERROR3: " + err.message);
										connection.rollback(function() {
											callback(err, null);
									      });
									}
									else {
										connection.commit(function(err) {
											if (err) { 
												connection.rollback(function() {
													callback(err, null);
												});
											}
											else {
												callback(null, rows);
												console.log("Group Member added");
											}
										});
									}
								});
							}
							
							
						}
					});
					
				}
				
			});
		}
	});
	
}


function deleteGroupSQL(callback,req){
	var connection=getConnection();
	connection.beginTransaction(function(err){
		if(err) { throw err;}
		else {
			var sqlQuery1="select groupId from groupInfo where createdBy='"+req.body.createdBy+"' AND groupName = '"+req.body.groupName+"';";
			//console.log("Query: "+sqlQuery1);
			connection.query(sqlQuery1, function(err, rows, fields) {
				if(err){
					console.log("ERROR1: " + err.message);
					connection.rollback(function() {
				        throw err;
				      });
				}
				else {
					console.log("valid user");
					var groupId = rows[0].groupId;
					var sqlQuery2="delete from groupMember where groupId='"+groupId+"';";
					connection.query(sqlQuery2, function(err, rows, fields) {
						if(err){
							console.log("ERROR2: " + err.message);
							connection.rollback(function() {
						        throw err;
						      });
						}
						else {
							//console.log("group id obtained");
							if(rows.affectedRows > 0){
								
								var sqlQuery3="delete from groupInfo where groupName = '"+req.body.groupName+"';";
								console.log(sqlQuery3);
								connection.query(sqlQuery3, function(err, rows, fields) {
									if(err){
										console.log("ERROR3: " + err.message);
										connection.rollback(function() {
									        throw err;
									      });
									}
									else {
										connection.commit(function(err) {
											if (err) { 
												connection.rollback(function() {
										            throw err;
												});
											}
											else {
												console.log("Group deleted");
											}
										});
									}
								});
							}
							
							
						}
					});
					
				}
				
			});
		}
	});
	
}

function deleteGroupMemberSQL(callback,req){
	var connection=getConnection();
	connection.beginTransaction(function(err){
		if(err) { callback(err, null);}
		else {
			var sqlQuery1="select * from groupInfo where createdBy='"+req.body.createdBy+"';";
			connection.query(sqlQuery1, function(err, rows, fields) {
				if(err){
					console.log("ERROR1: " + err.message);
					connection.rollback(function() {
						callback(err, null);
				      });
				}
				else {
					console.log("valid user");
					var sqlQuery2="select groupId from groupInfo where groupName='"+req.body.groupName+"';";
					connection.query(sqlQuery2, function(err, rows, fields) {
						if(err){
							console.log("ERROR2: " + err.message);
							connection.rollback(function() {
								callback(err, null);
						      });
						}
						else {
							console.log("group id obtained");
							if(rows.length > 0){
								var groupId = rows[0].groupId;
								var sqlQuery3="delete from groupMember where groupId='"+groupId+"' AND memberConfirmed =(select userid from signupinfo where fname='"+req.body.fname+"' and lname='"+req.body.lname+"');";
								console.log("inside delete:"+sqlQuery3);
								connection.query(sqlQuery3, function(err, rows, fields) {
									if(err){
										console.log("ERROR3: " + err.message);
										connection.rollback(function() {
											callback(err, null);
									      });
									}
									else {
										connection.commit(function(err) {
											if (err) { 
												connection.rollback(function() {
													callback(err, null);
												});
											}
											else {
												console.log("Group Member deleted");
												rows = 1;
												callback(null,rows);
											}
										});
									}
								});
							}
							
							
						}
					});
					
				}
				
			});
		}
	});
}

function getGroupsSQL(callback,req){
	
	var connection=getConnection();
	var sqlQuery = "select groupName from groupInfo where groupId IN(select groupId from groupMember where memberConfirmed='"+req.body.memberConfirmed+"');";
	console.log("SqlQuery:"+sqlQuery);
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
			callback(err, null);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}

function getGroupNamesSQL(callback,req){
	
	var connection=getConnection();
	var sqlQuery = "select groupName from groupInfo;";
	console.log("SqlQuery:"+sqlQuery);
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
			callback(err, null);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}



function showGroupMemberSQL(callback,sqlQuery1,sqlQuery2){
	
		var connection=getConnection();
			
			connection.beginTransaction(function(err){
				if(err) { callback(err, null);}
				else {
					
					connection.query(sqlQuery1, function(err, rows, fields) {
						if(err){
							console.log("ERROR1: " + err.message);
							connection.rollback(function() {
								callback(err, null);
						      });
						}
						
						else if(rows.length > 0){
							
							//console.log("rows.length"+rows.length);
							console.log("user input validated");
							//console.log("query 1:"+sqlQuery1);
							//console.log("rows1:"+rows);
												
							connection.query(sqlQuery2, function(err, rows, fields) {
								if(err){
									console.log("ERROR2: " + err.message);
									connection.rollback(function() {
										callback(err, null);
								      });
									
								}
								else {
									connection.commit(function(err) {
										if (err) { 
											connection.rollback(function() {
												callback(err, null);
											});
										}
										
									});
									console.log("group members extracted"+rows);
									callback(null, rows);
									
								}
								
							});
						}
						else {
							console.log("group members not extracted");
							connection.rollback(function() {
								callback(err, null);
						      });
						}
						
					});
					
				}
				
			});	
		
}


function extractPersonalInfoSQL(callback,sqlQuery1,sqlQuery2){
	
	var connection=getConnection();
		
		connection.beginTransaction(function(err){
			if(err) { 
				var response = 0;
				callback(err, response);}
			else {
				
				connection.query(sqlQuery1, function(err, rows, fields) {
					if(err){
						console.log("ERROR1: " + err.message);
						connection.rollback(function() {
							callback(err, rows);
					      });
					}
					
					else if(rows.length > 0){
						
						console.log("user input validated");		
											
						connection.query(sqlQuery2, function(err, rows, fields) {
							if(err){
								console.log("ERROR2: " + err.message);
								connection.rollback(function() {
									callback(err, rows);
							      });
								
							}
							else {
								connection.commit(function(err) {
									if (err) { 
										connection.rollback(function() {
											callback(err, rows);
										});
									}
									
								});
								console.log("user info extracted");
								callback(err, rows);
							}
							
						});
					}
					else {
						console.log("user info not extracted");
						connection.rollback(function() {
							callback(err, rows);
					      });
					}
					
				});
				
			}
			
		});	
	
}

function getPersonalInfoSQL(callback,sqlQuery1,sqlQuery2){
	
	var connection=getConnection();
		
		connection.beginTransaction(function(err){
			if(err) { 
				
				callback(err, null);}
			else {
				
				connection.query(sqlQuery1, function(err, rows, fields) {
					if(err){
						console.log("ERROR1: " + err.message);
						connection.rollback(function() {
							callback(err, null);
					      });
					}
					
					else if(rows.length > 0){
						
						console.log("user input validated");
						connection.query(sqlQuery2, function(err, res, fields) {
							if(err){
								console.log("ERROR2: " + err.message);
								connection.rollback(function() {
									callback(err, null);
							      });
								
							}
							else if(res.length>0) {
								console.log(res);
								//console.log("signup info extracted");
								//console.log(res.fname);
								callback(null, res);
							}
							else{
								callback(err, null);
							}
							
						});
					}
					else {
						console.log("signup info not extracted");
						connection.rollback(function() {
							callback(err, null);
					      });
					}
					
				});
				
			}
			
		});	
	
}

function showAllNewsFeedSQL(callback,sqlQuery1,sqlQuery2){
	
	var connection=getConnection();
		
		connection.beginTransaction(function(err){
			if(err) { callback(err, null);}
			else {
				
				connection.query(sqlQuery1, function(err, rows, fields) {
					if(err){
						console.log("ERROR1: " + err.message);
						connection.rollback(function() {
							callback(err, null);
					      });
					}
					
					else if(rows.length > 0){
						
						//console.log("rows.length"+rows.length);
						console.log("user input validated");
						//console.log("query 1:"+sqlQuery1);
						//console.log("rows1:"+rows);
											
						connection.query(sqlQuery2, function(err, rows, fields) {
							if(err){
								console.log("ERROR2: " + err.message);
								connection.rollback(function() {
									callback(err, null);
							      });
								
							}
							else {
								connection.commit(function(err) {
									if (err) { 
										connection.rollback(function() {
											callback(err, null);
										});
									}
									
								});
								console.log("all news feed extracted extracted");
								callback(null, rows);
							}
							
						});
					}
					else {
						console.log("all news feed not extracted");
						connection.rollback(function() {
							callback(err, null);
					      });
					}
					
				});
				
			}
			
		});	
	
}


exports.executeQuery=executeQuery;
exports.executeTransaction=executeTransaction;
exports.executeTransactionWithoutQuery=executeTransactionWithoutQuery;
exports.sendFriendReqSQL=sendFriendReqSQL;
exports.acceptFriendReqSQL=acceptFriendReqSQL;
exports.getFriendsSQL=getFriendsSQL;
exports.createNewsFeedSQL = createNewsFeedSQL;
exports.deleteNewsFeedSQL = deleteNewsFeedSQL;
exports.showNewsFeedSQL = showNewsFeedSQL;
exports.createGroupSQL = createGroupSQL;
exports.deleteGroupSQL = deleteGroupSQL;
exports.addGroupMemberSQL = addGroupMemberSQL;
exports.deleteGroupMemberSQL = deleteGroupMemberSQL;
exports.getGroupsSQL = getGroupsSQL;
exports.showGroupMemberSQL = showGroupMemberSQL;
exports.extractPersonalInfoSQL = extractPersonalInfoSQL;
exports.getPersonalInfoSQL = getPersonalInfoSQL;
exports.showAllNewsFeedSQL = showAllNewsFeedSQL;
exports.getGroupNamesSQL = getGroupNamesSQL;