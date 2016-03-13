angular.module('Hayacook').service('AuthSvc',
		['$http', '$cookies', '$state', function ($http, $cookies, $state) {
			var authStatus = false;
			var authData;

			// Initialize
			if (authData = $cookies.get('authorization')) {
				authStatus = true;
				$http.defaults.headers.common['Authorization'] = authData;
			}

			// Login Method
			this.login = function (username, password, callback) {
				authData = 'Basic ' + btoa(username + ':' + password);
				$http.defaults.headers.common['Authorization'] = authData;
				$cookies.put('authorization', authData);
				$http.get('/api/user/me').then(
						function () {
							authStatus = true;
							callback(null);
						},
						function (err) {
							authStatus = false;
							callback(err);
						}
				);
			};

			// Logout Method
			this.logout = function () {
				$http.defaults.headers.common['Authorization'] = '';
				$cookies.remove('authorization');
				authStatus = false;
			};

			// Login Check Method
			this.status = function () {
				return authStatus;
			};

			this.verify = function () {
				if (!authStatus) {
					$state.go('login');
					return false;
				}
				return true;
			}
		}]);