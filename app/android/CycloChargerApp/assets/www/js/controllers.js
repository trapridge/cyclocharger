'use strict';

MyCtrl1.$inject = ['$scope', 'notification', 'sensor', '$timeout'];
function MyCtrl1($scope, notification, sensor, $timeout) {	

	$scope.name = 'World';

	$scope.data = 'data here';
	$scope.data += '...';
	$scope.device = '7C:D1:C3:F4:83:A4';

	$scope.test = function(s) {
		alert(s);
	}

	$scope.connect = function() {
		sensor.connect(function() {
			notification.alert(
				'Ready to read data from sensor', 
				function() {}, 
				'Connection done', 
				'OK'
			);
		}, function(error) {
			notification.alert(
				error, 
				function() {}, 
				'Connection problem', 
				'OK'
			);
		}, $scope.device);
	}

	$scope.disconnect = function() {
		sensor.disconnect(function() {
			notification.alert(
				'...', 
				function() {}, 
				'Disconnected', 
				'OK'
			);
		}, function(error) {
			notification.alert(
				error, 
				function() {}, 
				'Disconnection problem', 
				'OK...'
			);
		});
	}

	$scope.getValue = function() {
		sensor.getValue(read, function(error) {
			console.log(error);
		});
	}

	function read(data) {
		$timeout(function() {
			$scope.data = '\n' + $scope.data;
			$scope.data = data + $scope.data;
			$scope.getValue();
		}, 100);
	}
}