MainAngularModule.factory('authService',function($http){
	var authService ={};

	authService.login = function(input) {
	return $http({
	method : 'POST',
	url : '/loginapi',
	data : input
	}).then(function(resp) {
	return(resp);
	});
	};


	return authService;
	});	
		