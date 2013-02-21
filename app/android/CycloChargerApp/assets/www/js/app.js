'use strict';

angular.module('myApp', [
		'myApp.filters', 
		'myApp.services', 
		'myApp.directives', 
		// '$strap.directives',
		// 'ui'
	]);

// var app = angular.module('angularjs-starter', ['$strap.directives']);

/*
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
	config(['$routeProvider', function($routeProvider) {
    	$routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
    	$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
    	$routeProvider.otherwise({redirectTo: '/view1'});
  	}]);
*/