(function () {
	var app = angular.module('Hayacook',
			['ngMaterial', 'ui.router', 'ngCookies']);

	app.config(['$stateProvider', '$urlRouterProvider', '$mdIconProvider',
		function ($stateProvider, $urlRouterProvider, $mdIconProvider) {
			$urlRouterProvider.otherwise('/');

			$stateProvider
					.state('root', {
						abstract: true,
						templateUrl: './html/root.html',
						controller: 'RootCtrl'
					})
					.state('root.home', {
						url: '/',
						templateUrl: './html/home.html'
					})
					.state('root.recipe', {
						url: '/recipe',
						templateUrl: './html/recipe.html',
						controller: 'RecipeCtrl'
					})
					.state('root.user', {
						url: '/user',
						templateUrl: './html/user.html'
					})
					.state('login', {
						url: '/login',
						templateUrl: './html/login.html',
						controller: 'LoginCtrl'
					});

			$mdIconProvider
					.icon('menu', '/libs/material-design-icons/navigation/svg/production/ic_menu_24px.svg')
					.icon('add', '/libs/material-design-icons/content/svg/production/ic_add_24px.svg')
					.icon('create', '/libs/material-design-icons/content/svg/production/ic_create_24px.svg');
		}]);
})();
