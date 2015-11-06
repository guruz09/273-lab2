MainAngularModule.controller('loginController',function($scope,homeService,$rootScope,$http,$location,$rootScope,authService,$timeout){
	 	 
	 $scope.loginFunction= function(){	
		 
		 console.log($scope.userId, $scope.password);
		 
         $http({
 			method: 'post',
 			url: '/loginapi',
 			data: {"email":$scope.userId,"password":$scope.password}		
 		}).success(function(data) {
 			console.log(data.Login);			
 			if(data.Login === 'Fail'){
 				$scope.invalidtext="* Invalid Login";
 				console.log("invalid login");
 			}
 			else{
 				console.log("valid login");
 				homeService.saveuname($scope.userId);
 				//$rootScope.username = "Baby";
 				//$location.path('/afterlogin');
 				window.location.assign("/afterlogin");
 			}					
 		});	
	 };
});
 

MainAngularModule.controller('signupController',function($scope,$http,$location,$rootScope,authService,$timeout,signupService){
	 console.log("in my controller - signupController");
	 
	 
	 $scope.signupFunction= function(){
		 
		 console.log($scope.userId1, $scope.password, $scope.userId2, $scope.fname, $scope.lname, $scope.birthday_day, $scope.birthday_month, $scope.birthday_year);
		 console.log($scope.sex);
		 
		 console.log($scope.userId1);
		 console.log($scope.userId2);
		 if($scope.userId2 !== $scope.userId1){
			 $scope.invalidtext2="* Email-id doesn't match";
		 }
		 else {
		 
		 $scope.dob = $scope.birthday_year+"-"+$scope.birthday_month+"-"+$scope.birthday_day;
		 console.log($scope.dob);
         
		 var input= {"firstname":$scope.fname,"lastname":$scope.lname,"email":$scope.userId1,"password":$scope.password,"dob":$scope.dob,"gender":$scope.sex};
		
		 console.log(input);
		 
		
		 $http({
				method: 'post',
				url: '/signUPapi',
				data: {"firstname":$scope.fname,"lastname":$scope.lname,"email":$scope.userId1,"password":$scope.password,"dob":$scope.dob,"gender":$scope.sex}		
			}).success(function(data) {
				console.log(data);
				if(data.value == -1){
					console.log("duplicate");
					 $scope.invalidtext2="* Email-Id already exists!";
				}
				else if(data.value == 0){
					 console.log("failure");
		       		$scope.invalidtext2="* SignUp Failed";					
				}	
				else{
					console.log("signup successful");
					$location.path('/signupsuccess');
				}
			});
	   }
	
	 };	
});
