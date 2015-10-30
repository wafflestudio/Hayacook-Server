angular.module('IndexAdmin').controller('ChannelCtrl',
		['$scope', '$http', '$state', 'AuthSvc', function ($scope, $http, $state, AuthSvc) {
			if (!AuthSvc.verify()) return;
			$http.post('/api/admin/channel/read', {}).then(
					function (res) {
						$scope.list = res.data;
					},
					function (err) {
						alert('채널 목록을 가져올 수 없습니다');
						console.log(err);
					}
			);

			$scope.edit = function (channel) {
				$state.go('root.channelEdit', {id: channel._id});
			};
		}]);