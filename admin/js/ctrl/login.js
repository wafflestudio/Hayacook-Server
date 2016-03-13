angular.module('Hayacook').controller('LoginCtrl',
		['$scope', '$state', 'AuthSvc', function ($scope, $state, AuthSvc) {
			$scope.login = function () {
				AuthSvc.login($scope.id, $scope.password, function (err) {
					if (err) alert('로그인에 실패했습니다');
					else $state.go('root.home');
				})
			};
}]);