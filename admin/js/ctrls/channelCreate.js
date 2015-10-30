angular.module('IndexAdmin').controller('ChannelCreateCtrl',
		['$scope', '$http', '$state', 'AuthSvc', function ($scope, $http, $state, AuthSvc) {
			if (!AuthSvc.verify()) return;

			$scope.channel = {form: {}};

			$scope.save = function () {
				$http.post('/api/admin/channel/create', $scope.channel).then(
						function (res) {
							alert('저장되었습니다');
							$state.go('root.channel');
						},
						function (err) {
							alert('저장 중 문제가 발생했습니다');
							console.log(err);
						}
				)
			};

		}]);