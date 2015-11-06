MainAngularModule.controller('HomePageController',function($scope,$rootScope,$http,$location,$rootScope,homeService,$timeout){
	console.log("inside homepage controller");

	
	
	$scope.updatestatus = function(){
		console.log("in submitting the post");
		console.log($scope.status);
		
		$http({
 			method: 'post',
 			url: '/createNewsFeedapi',
 			data: {"userId":"nr@gm.com","feeds" : $scope.status}		
 		}).success(function(data) {
 			$scope.status ="";
 			$scope.loadPageData();
 		});
 	};
	
	$scope.loadPageData= function(){
		
		
		console.log("I am in loadpagedata "+ $rootScope.username);		
				
		$http({
 			method: 'post',
 			url: '/showAllNewsFeedapi',
 			data: {"userId":"rg@gm.com"}		
 		}).success(function(data) {
 			
 			 var response = data.value; 				 
 			 console.log("length is - " + response.length);
 			 for (var i = 0; i < response.length; i++) {
				console.log("value is -"+ response[i].name);
			}
 			
 			if(data.code === "401"){
 				//$scope.invalidtext="* Invalid Login";
 				console.log("no feeds");
 			}
 			else{
 				$scope.news = response;
// 				console.log("name-"+$scope.news[0].name);
// 				console.log("post-"+$scope.news[0].post);
 			}					
 		});
		
//		$scope.sessionid = homeService.getuname();
//		
//		console.log("session is "+ $scope.sessionid );
		
//		var input= {"userId":$scope.sessionid};
//	    
//	    
//		homeService.getUserName(input).then(function(res){
//			
//			if(res.data.value == 0){
//	   		 $scope.displayname="* Invalid Login";
//	   		 //console.log(res.data.value);
//	   	 }
//	   	 
//			else{
//				//console.log(res.data.value);
//				$scope.displayname = res.data.value[0].fname+" "+res.data.value[0].lname;
//	   	 }
//	    	
//	    });
//		
//		$scope.groups = {
//				groupsList: []
//		};
//		
//		input = {"memberConfirmed":$scope.sessionid};
//		
//		homeService.getGroupList(input).then(function(res){
//			
//			if(res.data.value == 0){
//				console.log("No groups to display");
//				
//			}
//			else{
//				var grplist = res.data.value;
//				
//				for(var i=0; i<grplist.length; i++){
//					console.log(grplist[i].groupName);
//					
//					$scope.groups.groupsList.push(grplist[i].groupName);
//				}
//			}
//		});
//		
// 	
//		$scope.news = {
//				newsList: []
//		};
//
//		input = {"userId":$scope.sessionid};
//		
//		homeService.getAllNews(input).then(function(res){
//			
//			if(res.data.value == 0){
//				console.log("No groups to display");
//				
//			}
//			else{
//				
//				var newlist = res.data.value;
//				var stringvalue;
//				
//				for(var i=0; i < newlist.length; i++){
//					stringvalue = newlist[i].fname+" "+newlist[i].lname+":"+newlist[i].feeds;
//					
//					$scope.news.newsList.push(stringvalue);
//					
//					console.log(stringvalue);
//					stringvalue = "";
//				}
//			}
//		});		
		
	};
	
	
	$scope.groupload = function(data){
//		console.log("data:"+data);
//		homeService.addgroup(data);
		$location.path('/groupspage');
		
	};
	
	 $scope.loadAboutPage = function() {
		 $location.path('/loadAboutPage');	 
	 };
	 
	 $scope.loadFriends = function() {
		 $location.path('/loadFriendsPage');	
	 };
	 
	 $scope.loadWorkEdu = function() {
		 $location.path('/loadWorkEdu');	
	 };
	 
	 $scope.loadInterests = function() {
		 $location.path('/loadInterests');	
	 };
	 
	 $scope.loadLifeEvents = function() {
		 $location.path('/loadLifeEvents');	
	 };
	 
	 $scope.loadContactInfo = function() {
		 $location.path('/loadContactInfo');	
	 };
	
	$scope.groupPageInit = function() {
		
		$scope.sessionid = "rekha@gmail.com";
		
		$scope.groupname = homeService.getgroup();
		
	
		
		var input= {"memberConfirmed":$scope.sessionid, "groupName":$scope.groupname};
		$scope.grpMem = {
				memList: []
		};
		$scope.grpMem1 = {
				memList: []
		};
	    
		homeService.getGroupMemberOwn(input).then(function(result){
			
			if(result.data.value == 0){
	   		console.log("failure");
	   		homeService.getGroupMember(input).then(function(res){
	   			if(res.data.value == 0){
	   				console.log("failure");
	   			}
	   			else{
	   				console.log("i am here inside first else block");
	   				var grp2 = res.data.value;
					for(var i=0; i<grp2.length;i++){
						console.log("values:"+grp2[i].memberConfirmed);
						var username = grp2[i].fname+" "+grp2[i].lname;
						$scope.grpMem1.memList.push(username);	
						username = "";
						
					}
					$scope.existinggroupmember = !$scope.existinggroupmember;
					
	   			}
	   		});
	   	 
			}	   	 
			else{
				console.log("i am here inside second else block");
				$scope.flag = true;
				var grp1 = result.data.value;
				console.log("group value:"+grp1.length);
				for(var i=0; i<grp1.length;i++){
					var usernme = grp1[i].fname+" "+grp1[i].lname;
					$scope.grpMem.memList.push(usernme);
					usernme = "";
				}
				$scope.newgroupmember = !$scope.newgroupmember;
				
				console.log(input);
	   	 }
	    	
	    });
		

		$scope.friendsNames = [];
		$scope.friendsNamesSorted = [];
		
		input = {"userId":$scope.sessionid};
		homeService.getFriendsNames(input).then(function(result){
			if(result.data.value == 0){
				console.log("No members");
			}
			else {
				
				var friendsName1 = result.data.value;
				for(var i=0; i<friendsName1.length;i++){
					console.log("in controller:"+friendsName1[i]);
					$scope.friendsNames.push(friendsName1[i].friendWith);	
					
				}
			}
		});
	};
	
	$scope.friendsSearch = function() {
		
		if($scope.searchText === null){
			$scope.newgroupmember = false;
			$scope.existinggroupmember = false;
			$scope.groupName = true;
			$scope.groupPageInit();
		}
		
		$scope.searchText = $scope.searchText.toLowerCase();
		$scope.newgroupmember = true;
		$scope.existinggroupmember = true;
		angular.forEach($scope.friendsNames, function(mem){
            if(mem.toLowerCase().indexOf($scope.searchText) !== -1){
            $scope.friendsNamesSorted.push(mem);
        }
           
        });	
	};
	
	$scope.addGroupMember = function(memName) {
		
		$scope.groupname = homeService.getgroup();
		
		var input ={"memberConfirmed":$scope.memName, "groupName":$scope.groupname,"createdBy":$scope.sessionid};
		
		homeService.addGroupMember(input).then(function(result){
			if(result.data.value == 0){
   				console.log("member cannot be added");
   			}
   			else{
   				$scope.groupPageInit();
   			}
		});
		
	};
	
	
	$scope.deleteGroupMember = function(groupMember){
		
		$scope.groupname = homeService.getgroup();
		
		var n = groupMember.indexOf(" ");
		var fname = groupMember.substr(0,n);
		var lname = groupMember.substr(n+1);
		
		var input= {"createdBy":$scope.sessionid, "fname":fname, "lname":lname, "groupName":$scope.groupname};
		homeService.delGroupMember(input).then(function(result){
			if(result.data.value == 0){
				console.log("response from del method:"+result.data.value);
   				console.log("failure");
   			}
   			else{
   				$scope.groupPageInit();
   			}
			
		});
	};
	
	$scope.overviewarr = [];
	$scope.fetchOverview = function(input) {
		var temp;	
		homeService.getOverviewInfo(input).then(function(result){
			if(result.data.value == 0){
				console.log("overview  info cannot be extracted");
			}
			else{
				
				var overviews = result.data.value;
				temp = overviews[0].description +";"+overviews[0].timeStamp;
					$scope.overviewarr.push(temp);	
			
	    }
			
		});
	}; 
	
	
	$scope.overviewPageInit = function(){
	    var responseData = [];
	    var temp;
		
		for (var i=2;i<=6;i++){
			var input = {"userId":$scope.sessionid,"masterId":i};
			$scope.fetchOverview(input);
		$scope.displayoverview = !$scope.displayOverview;
		}
	};
		
		$scope.workEduPageInit = function(){
			
			$scope.myworkEdu = [];
			var temp;
			var input = {"userId":$scope.sessionid,"masterId":2};
			homeService.getOverviewInfo(input).then(function(result){
				if(result.data.value == 0){
					console.log("overview  info cannot be extracted");
				}
				else{
					
					var overviews = result.data.value;
					for(var i=0; i<overviews.length;i++){
						temp = overviews[i].description +";"+overviews[i].timeStamp;
						console.log("temp:"+temp);
						$scope.myworkEdu.push(temp);
					}
		    }
			if($scope.myworkEdu.length > 0){
				$scope.displayworkEdu = !$scope.displayworkEdu;
			}
		});
		};
		
        $scope.lifeEventsPageInit = function(){
			
			$scope.lifeEvents = [];
			var temp;
			var input = {"userId":$scope.sessionid,"masterId":4};
			homeService.getOverviewInfo(input).then(function(result){
				if(result.data.value == 0){
					console.log("overview  info cannot be extracted");
				}
				else{
					
					var overviews = result.data.value;
					for(var i=0; i<overviews.length;i++){
						temp = overviews[i].description +";"+overviews[i].timeStamp;
						console.log("temp:"+temp);
						$scope.lifeEvents.push(temp);
					}
		    }
			if($scope.lifeEvents.length > 0){
				$scope.displaylifeEvents = !$scope.displaylifeEvents;
			}
		});
        };
		
       $scope.cntctInfoPageInit = function(){
			
			$scope.cntctInfo = [];
			var temp;
			var input = {"userId":$scope.sessionid,"masterId":4};
			homeService.getOverviewInfo(input).then(function(result){
				if(result.data.value == 0){
					console.log("overview  info cannot be extracted");
				}
				else{
					
					var overviews = result.data.value;
					for(var i=0; i<overviews.length;i++){
						temp = overviews[i].description +";"+overviews[i].timeStamp;
						console.log("temp:"+temp);
						$scope.cntctInfo.push(temp);
					}
		    }
			if($scope.cntctInfo.length > 0){
				$scope.displaycntctInfo = !$scope.displaycntctInfo;
			}
		});
       };
		
       $scope.interestsPageInit = function(){
			
			$scope.interests = [];
			var temp;
			var input = {"userId":$scope.sessionid,"masterId":4};
			homeService.getOverviewInfo(input).then(function(result){
				if(result.data.value == 0){
					console.log("overview  info cannot be extracted");
				}
				else{
					
					var overviews = result.data.value;
					for(var i=0; i<overviews.length;i++){
						temp = overviews[i].description +";"+overviews[i].timeStamp;
						console.log("temp:"+temp);
						$scope.interests.push(temp);
					}
		    }
			if($scope.interests.length > 0){
				$scope.displayinterests = !$scope.displayinterests;
			}
		});
       };
	
});


MainAngularModule.filter('split', function() {
    return function(input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        return input.split(splitChar)[splitIndex];
    };
    
});

MainAngularModule.filter('searchFor', function() {
	
	return function(arr, searchString){
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(item){
            if(item.toLowerCase().indexOf(searchString) !== -1){
            result.push(item);
        }
        });
        return result;
    };
    
});

