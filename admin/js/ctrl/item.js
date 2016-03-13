angular.module('Hayacook')
.controller(function ($scope, $http) {
	$http.get('/api/')
});