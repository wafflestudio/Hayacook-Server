angular.module('Hayacook').controller('RecipeCtrl',
		['$scope', '$http', 'AuthSvc', function ($scope, $http, AuthSvc) {
			if (!AuthSvc.verify()) return;

			// Load recipe list
			$http.get('/api/recipe').then(
					function (res) {
						$scope.list = res.data;
					},
					function (err) {
						console.log(err);
						alert('레서피를 불러오지 못했습니다');
					}
			);
		}]);