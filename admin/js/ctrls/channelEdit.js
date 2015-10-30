angular.module('IndexAdmin').controller('ChannelEditCtrl',
		['$scope', '$http', '$state', '$stateParams', 'AuthSvc', function ($scope, $http, $state, $stateParams, AuthSvc) {
			if (!AuthSvc.verify()) return;

			// Category auto complete
			$scope.selectedCategory = null;
			$scope.categoryText = null;
			var categories = [];
			$http.post('/api/admin/category/read', {}).then(
					function (res) {categories = res.data;},
					function (err) {console.log(err);}
			);
			$scope.categorySearch = function (query) {
				if (!query) return [];
				return categories.filter(function (elem) {return elem.name.indexOf(query) > -1});
			};
			$scope.appendCategory = function (parent) {
				return parent.name;
			};


			$http.post('/api/admin/channel/read', {_id: $stateParams.id}).then(
					function (res) {
						$scope.channel = res.data[0];
					},
					function (err) {
						alert('채널 정보를 가져오지 못했습니다');
						console.log(err);
					}
			);

			$scope.save = function () {
				$http.post('/api/admin/channel/update', $scope.channel).then(
						function (res) {
							alert('저장되었습니다');
							$state.go('root.channel');
						},
						function (err) {
							alert('저장 중 문제가 발생했습니다');
							console.log(err);
						}
				);
			};

			$scope.delete = function () {
				if (!confirm("삭제하시겠습니까?")) return;

				$http.post('/api/admin/channel/delete', {_id: $scope.channel._id}).then(
						function (res) {
							$state.go('root.channel');
						},
						function (err) {
							alert('삭제 중 문제가 발생했습니다');
							console.log(err);
						}
				);
			}
}]);