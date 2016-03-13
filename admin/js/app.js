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
			.state('root.item', {
				url: '/item',
				templateUrl: './html/item.html',
				controller: 'ItemCtrl',
				auth: 1
			})
			.state('root.recipe', {
				url: '/recipe',
				templateUrl: './html/recipe.html',
				controller: 'RecipeCtrl',
				auth: 1
			})
			.state('root.recipeCreate', {
				url: '/recipe/create',
				templateUrl: './html/recipeCreate.html',
				controller: 'Recipe',
				auth: 1
			})
			.state('root.user', {
				url: '/user',
				templateUrl: './html/user.html',
				auth: 1
			})
			.state('login', {
				url: '/login',
				templateUrl: './html/login.html',
				controller: 'LoginCtrl',
				auth: -1
			});

			$mdIconProvider
			.icon('menu', '/libs/material-design-icons/navigation/svg/production/ic_menu_24px.svg')
			.icon('add', '/libs/material-design-icons/content/svg/production/ic_add_24px.svg')
			.icon('create', '/libs/material-design-icons/content/svg/production/ic_create_24px.svg');
		}]);

	app.run(function ($rootScope, $state, AuthSvc) {
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			if (toState.auth == 1 && !AuthSvc.status()) {
				$state.transitionTo('login');
				event.preventDefault();
			}
			else if (toState.auth == -1 && AuthSvc.status()) {
				$state.transitionTo('publisher.dashboard');
				event.preventDefault();
			}
		})
	})
})();
