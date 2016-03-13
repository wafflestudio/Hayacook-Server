angular.module('IndexAdmin').controller('CategoryEditCtrl',
		['$scope', '$http', '$state', '$stateParams', 'AuthSvc', function ($scope, $http, $state, $stateParams, AuthSvc) {
			if (!AuthSvc.verify()) return;

			$scope.cat = {
				name: '',
				parents: []
			};
			$scope.selectedParent = null;
			$scope.parentText = null;

			var categories = [];
			$http.post('/api/admin/category/read', {}).then(
					function (res) {categories = res.data;},
					function (err) {console.log(err);}
			);

			if ($stateParams.name) {
				$http.post('/api/admin/category/read', {name: $stateParams.name}).then(
						function (res) {
							$scope.cat.name = res.data[0].name;
							$scope.cat.parents = res.data[0].parents;
							$scope.modify = true;

						},
						function (err) {
							console.log(err);
						}
				)
			}

			$scope.parentSearch = function (query) {
				if (!query) return [];
				return categories.filter(function (elem) {return elem.name.indexOf(query) > -1});
			};

			$scope.appendParent = function (parent) {
				return parent.name;
			};

			$scope.save = function () {
				if ($scope.modify) {
					$http.post('/api/admin/category/update', $scope.cat).then(
							function (res) {alert("등록되었습니다"); $state.go('root.category');},
							function (err) {console.log(err); alert('문제가 발생했습니다');}
					);
				}
				else {
					$http.post('/api/admin/category/create', $scope.cat).then(
							function (res) {alert("등록되었습니다"); $state.go('root.category');},
							function (err) {console.log(err); alert('문제가 발생했습니다');}
					);
				}
			};

			$scope.delete = function () {
				if (!confirm("정말로 삭제하시겠습니까?")) return;
				$http.post('/api/admin/category/delete', $scope.cat).then(
						function (res) {alert("삭제되었습니다"); $state.go('root.category');},
						function (err) {console.log(err); alert('문제가 발생했습니다');}
				)
			};
		}]);