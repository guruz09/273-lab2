var MainAngularModule = angular.module('MainAngularModule', ['ngRoute','ui.bootstrap'])
.run(function($rootScope) {
	$rootScope.username = "";
});

MainAngularModule.config(['$locationProvider', '$routeProvider', function($locationProvider,$routeProvider) {
	  $locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
  $routeProvider
  .when('/', {
    templateUrl: 'login',
    controller: 'loginController'
  })
//  .when('/afterlogin', {
//    templateUrl: 'logincenterpage',
//    controller: 'HomePageController'
//  })
//   .when('/logincenterpage', {
//    templateUrl: 'logincenterpage',
//    controller: 'HomePageController'
//  })
//  
//  .when('/signupsuccess', {
//	    templateUrl: 'signupsuccess'
//	 //   controller: 'loginController'
//	  })
//  .when('/loadAboutPage',{
//	  templateUrl:'loadAboutPage',
//	  controller: 'HomePageController'
//  })
//  .when('/loadFriendsPage',{
//	  templateUrl:'loadFriendsPage',
//	  controller: 'HomePageController'
//  })
//  .when('/loadWorkEdu',{
//	  templateUrl:'loadWorkEdu',
//	  controller: 'HomePageController'
//  })
//  .when('/loadInterests',{
//	  templateUrl:'loadInterests',
//	  controller: 'HomePageController'
//  })
//  .when('/loadLifeEvents',{
//	  templateUrl:'loadLifeEvents',
//	  controller: 'HomePageController'
//  })
//  .when('/loadContactInfo',{
//	  templateUrl:'loadContactInfo',
//	  controller: 'HomePageController'
//  })
//  .when('/groupspage', {
//	    templateUrl: 'groupspage',
//	    controller: 'HomePageController'
//	  })	  
	  
  .otherwise({
    redirectTo: '/'
  });
}]);

