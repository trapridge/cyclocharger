'use strict';

MyCtrl1.$inject = ['$scope', 'notification', 'sensor'];
function MyCtrl1($scope, notification, sensor) {	

	$scope.data = 'data here';
	$scope.data += '...';
	$scope.device = '7C:D1:C3:F4:83:A4';

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

		//alert('about to read')

		sensor.getValue(read, function(error) {
			alert(error);
		});
	}

	function read(data) {
		$scope.data += data;	
		$scope.getValue();
	}
}