angular.module('Hayacook')
		.controller('RootCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
			$scope.toggleSidenav = function (menuId) {
				$mdSidenav(menuId).toggle();
			};
		}]);