/**
 * New node file
 */
MainAngularModule.controller('afterLoginController',function($scope,$http,$location){
	 console.log("in my second ocntorller");
	 
	 
	 $scope.loginFunction= function(){	
		 
		 console.log($scope.userId, $scope.password);
     		 
	 $http({
    	 method:'post',
    	 url:'/loginapi',
    	 data:{"userId":$scope.userId,"password":$scope.password}
     }).success(function(data){
    	 
    	 if(data === "invalid"){
    		 $scope.invalidtext="* Invalid Login";
    	 }
    	 
    	 if(data === "valid"){
    		 //$location.path("/afterlogin");
    		 window.location.assign("/afterlogin")
    	 }
     });
	 };
 });