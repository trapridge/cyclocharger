'use strict';

MyCtrl1.$inject = ['$scope', 'notification', 'sensor', '$timeout'];
function MyCtrl1($scope, notification, sensor, $timeout) {	

	$scope.device = '7C:D1:C3:F4:83:A4';
	$scope.connectButtonTitle = 'Connect';
	$scope.data = '';

	$scope.connect = function() {
		sensor.connect(function() {
			$scope.connectButtonTitle = 'Connected';
			read();
		}, function(error) {
			console.log(error);
		}, $scope.device);
	}

	function read() {
		sensor.getValue(function(data) {
			$timeout(function() {
				$scope.data = data + '\n' + $scope.data;
				read();
			}, 100);
		}, function(error) {
			console.log(error);
		});
	}

}