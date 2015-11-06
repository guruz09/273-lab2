MainAngularModule.factory('homeService',function($http,$rootScope){
	var homeService ={};

	homeService.getUserName = function(input) {
	return $http({
	method : 'POST',
	url : 'getPersonalInfoapi',
	data : input
	}).then(function(resp) {
	return(resp);
	});
	};
    
	homeService.getGroupList = function(input) {
	return $http({
	method : 'POST',
	url : 'getGroupsapi',
	data : input
	}).then(function(resp) {
	return(resp);
	});
	};
				
		
	homeService.getAllNews = function(input) {
	return $http({
	method : 'POST',
	url : 'showAllNewsFeedapi',
	data : input
	}).then(function(resp) {
	return(resp);
	});
	};
	
	var uname;
	
	homeService.saveuname = function(data){
		console.log("In set uname");
		uname = data;
	};
	
	homeService.getuname = function(){
		console.log("In get uname");
		return uname;
	};	
				
	var groupname;
	
	homeService.addgroup = function(data){
		groupname = data;
	};
	
	homeService.getgroup = function(){
		return groupname;
	};
    
	homeService.getGroupMemberOwn = function(input) {
	return $http({
	method : 'POST',
	url : 'showGroupMemberForOwnerapi',
	data : input
	}).then(function(resp) {
	return(resp);
	});
	};	

	homeService.getGroupMember = function(input) {
	return $http({
	method : 'POST',
	url : 'showGroupMemberapi',
	data : input
	}).then(function(resp) {
	return(resp);
	});
	};
	
	homeService.delGroupMember = function(input) {
	return $http({
	method : 'POST',
	url : 'deleteGroupMemberapi',
	data : input
	}).then(function(resp) {
	return(resp);
	});
	};
	
	homeService.getFriendsNames = function(input) {
	return $http({
	method : 'POST',
	url : 'getFriendsapi',
	data : input
	}).then(function(resp) {
	return(resp);
	});
	};
	
	homeService.addGroupMember = function(input) {
	return $http({
	method : 'POST',
	url : 'addGroupMemberapi',
	data : input
	}).then(function(resp) {
	return(resp);
	});
	};

	homeService.getOverviewInfo = function(input) {
	return $http({
	method : 'POST',
	url : 'getOverviewInfoapi',
	data : input
	}).then(function(resp) {
	return(resp);
	});
	};
	
	
    return homeService;
	});	