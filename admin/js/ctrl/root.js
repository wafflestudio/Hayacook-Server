angular.module('Hayacook')
.controller('RootCtrl', ['$scope', function ($scope, AuthSvc) {
	$scope.logout = function () {
		AuthSvc.logout();
	}
}]);