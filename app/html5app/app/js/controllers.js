'use strict';

/* Controllers */


function MyCtrl1($scope) {	

	$scope.alert = function() {
		alert('Cool');
	};
}
MyCtrl1.$inject = ['$scope'];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
