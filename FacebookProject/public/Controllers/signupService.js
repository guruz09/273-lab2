MainAngularModule.factory('signupService',function($http){
	var signupService ={};

	signupService.signup = function(input) {
	return $http({
	method : 'POST',
	url : '/signUPapi',
	data : input
	}).then(function(resp) {
	return(resp);
	});
	};


	return signupService;
	});	
		